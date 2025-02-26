// services/folderService.js
const Folder = require('../models/Folder');
const FolderBookmark = require('../models/FolderBookmark');
const Bookmark = require('../models/Bookmark');

const folderService = {
  /**
   * Get all folders for a user, optionally nested
   */
  async getFolders(userId, nested = false) {
    if (nested) {
      // Get root folders
      const rootFolders = await Folder.find({ user_id: userId, parent_id: null })
        .lean();
      
      // Map each root folder to include its children recursively
      const getFolderWithChildren = async (folder) => {
        const children = await Folder.find({ user_id: userId, parent_id: folder._id }).lean();
        
        if (children.length === 0) {
          return folder;
        }
        
        // Recursively get children for each child
        const childrenWithNested = await Promise.all(
          children.map(child => getFolderWithChildren(child))
        );
        
        return {
          ...folder,
          children: childrenWithNested
        };
      };
      
      // Process all root folders
      return Promise.all(rootFolders.map(folder => getFolderWithChildren(folder)));
    } else {
      // Get flat list of all folders
      return await Folder.find({ user_id: userId }).lean();
    }
  },
  
  /**
   * Create a new folder
   */
  async createFolder(userId, { name, parent_id }) {
    // Validate parent folder if provided
    if (parent_id) {
      const parentFolder = await Folder.findOne({ _id: parent_id, user_id: userId });
      if (!parentFolder) {
        throw new Error('Parent folder not found');
      }
    }
    
    const folder = new Folder({
      name,
      parent_id: parent_id || null,
      user_id: userId
    });
    
    await folder.save();
    
    return folder;
  },
  
  /**
   * Get folder by ID
   */
  async getFolderById(id, userId) {
    return await Folder.findOne({ _id: id, user_id: userId }).lean();
  },
  
  /**
   * Update folder
   */
  async updateFolder(id, userId, { name, parent_id }) {
    // Validate parent folder if provided
    if (parent_id) {
      // Can't set parent to itself or its descendants
      if (id === parent_id) {
        throw new Error('A folder cannot be its own parent');
      }
      
      // Check if parent is one of folder's descendants
      const isDescendant = await this.isFolderDescendant(parent_id, id, userId);
      if (isDescendant) {
        throw new Error('Cannot set a descendant folder as parent');
      }
      
      const parentFolder = await Folder.findOne({ _id: parent_id, user_id: userId });
      if (!parentFolder) {
        throw new Error('Parent folder not found');
      }
    }
    
    // Update timestamp
    const updateData = {
      name,
      parent_id: parent_id || null,
      updated_at: new Date()
    };
    
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: id, user_id: userId },
      { $set: updateData },
      { new: true }
    ).lean();
    
    return updatedFolder;
  },
  
  /**
   * Delete folder and all its contents
   */
  async deleteFolder(id, userId) {
    // Get the folder
    const folder = await Folder.findOne({ _id: id, user_id: userId });
    
    if (!folder) {
      return { deletedCount: 0 };
    }
    
    // Get all descendant folders
    const descendants = await this.getAllDescendantFolders(id, userId);
    
    // Collect all folder IDs to delete
    const folderIds = [id, ...descendants.map(f => f._id)];
    
    // Remove all folder-bookmark relationships
    await FolderBookmark.deleteMany({ folder_id: { $in: folderIds }, user_id: userId });
    
    // Delete all folders
    const result = await Folder.deleteMany({ _id: { $in: folderIds }, user_id: userId });
    
    return result;
  },
  
  /**
   * Helper method to check if a folder is a descendant of another
   */
  async isFolderDescendant(folderId, possibleAncestorId, userId) {
    let currentFolderId = folderId;
    
    while (currentFolderId) {
      const folder = await Folder.findOne({ _id: currentFolderId, user_id: userId }).select('parent_id');
      
      if (!folder || !folder.parent_id) {
        return false;
      }
      
      if (folder.parent_id.toString() === possibleAncestorId.toString()) {
        return true;
      }
      
      currentFolderId = folder.parent_id;
    }
    
    return false;
  },
  
  /**
   * Get all descendant folders
   */
  async getAllDescendantFolders(folderId, userId) {
    const descendants = [];
    const queue = [folderId];
    
    while (queue.length > 0) {
      const currentId = queue.shift();
      
      const children = await Folder.find({ parent_id: currentId, user_id: userId });
      
      if (children.length > 0) {
        descendants.push(...children);
        queue.push(...children.map(child => child._id));
      }
    }
    
    return descendants;
  },
  
  /**
   * Get bookmarks in a folder
   */
  async getFolderBookmarks(folderId, userId, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort_by = 'added_at',
      sort_order = 'desc'
    } = options;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get bookmark IDs in this folder
    const folderBookmarks = await FolderBookmark.find({ folder_id: folderId, user_id: userId })
      .sort({ [sort_by]: sort_order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit);
    
    const bookmarkIds = folderBookmarks.map(fb => fb.bookmark_id);
    
    // Get actual bookmarks
    const bookmarks = await Bookmark.find({ 
      _id: { $in: bookmarkIds },
      user_id: userId
    }).lean();
    
    // Count total bookmarks in this folder
    const total = await FolderBookmark.countDocuments({ folder_id: folderId, user_id: userId });
    
    // Map bookmarks to include added_at date
    const bookmarksWithAddedDate = bookmarks.map(bookmark => {
      const folderBookmark = folderBookmarks.find(
        fb => fb.bookmark_id.toString() === bookmark._id.toString()
      );
      
      return {
        ...bookmark,
        added_to_folder_at: folderBookmark ? folderBookmark.added_at : null
      };
    });
    
    return {
      success: true,
      data: bookmarksWithAddedDate,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit)
    };
  },
  
  /**
   * Add bookmark to folder
   */
  async addBookmarkToFolder(bookmarkId, folderId, userId) {
    // Check if bookmark exists
    const bookmark = await Bookmark.findOne({ _id: bookmarkId, user_id: userId });
    if (!bookmark) {
      throw new Error('Bookmark not found');
    }
    
    // Check if folder exists
    const folder = await Folder.findOne({ _id: folderId, user_id: userId });
    if (!folder) {
      throw new Error('Folder not found');
    }
    
    // Check if relation already exists
    const existingRelation = await FolderBookmark.findOne({
      folder_id: folderId,
      bookmark_id: bookmarkId,
      user_id: userId
    });
    
    if (existingRelation) {
      // Update added_at timestamp
      existingRelation.added_at = new Date();
      await existingRelation.save();
      return existingRelation;
    }
    
    // Create new relation
    const folderBookmark = new FolderBookmark({
      folder_id: folderId,
      bookmark_id: bookmarkId,
      user_id: userId
    });
    
    await folderBookmark.save();
    
    return folderBookmark;
  },
  
  /**
   * Remove bookmark from folder
   */
  async removeBookmarkFromFolder(bookmarkId, folderId, userId) {
    return await FolderBookmark.deleteOne({
      folder_id: folderId,
      bookmark_id: bookmarkId,
      user_id: userId
    });
  },
  
  /**
   * Get folders containing a bookmark
   */
  async getBookmarkFolders(bookmarkId, userId) {
    // Get folder IDs containing this bookmark
    const folderBookmarks = await FolderBookmark.find({
      bookmark_id: bookmarkId,
      user_id: userId
    });
    
    const folderIds = folderBookmarks.map(fb => fb.folder_id);
    
    // Get folder details
    return await Folder.find({
      _id: { $in: folderIds },
      user_id: userId
    }).lean();
  }
};

module.exports = folderService;