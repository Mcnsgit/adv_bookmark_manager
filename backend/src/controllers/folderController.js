// controllers/folderController.js
const folderService = require('../services/folderService');
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../../../shared/constants/pagination');

const folderController = {
  /**
   * Get all folders
   */
  async getAllFolders(req, res, next) {
    try {
      const { nested = 'false' } = req.query;
      const isNested = nested === 'true';
      
      const folders = await folderService.getFolders(req.user._id, isNested);
      
      res.json({
        success: true,
        data: folders
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Create a new folder
   */
  async createFolder(req, res, next) {
    try {
      const { name, parent_id } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Folder name is required'
        });
      }
      
      const folder = await folderService.createFolder(req.user._id, { name, parent_id });
      
      res.status(201).json({
        success: true,
        data: folder
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get folder by ID
   */
  async getFolderById(req, res, next) {
    try {
      const { id } = req.params;
      
      const folder = await folderService.getFolderById(id, req.user._id);
      
      if (!folder) {
        return res.status(404).json({
          success: false,
          message: 'Folder not found'
        });
      }
      
      res.json({
        success: true,
        data: folder
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Update folder
   */
  async updateFolder(req, res, next) {
    try {
      const { id } = req.params;
      const { name, parent_id } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Folder name is required'
        });
      }
      
      const folder = await folderService.updateFolder(id, req.user._id, { name, parent_id });
      
      if (!folder) {
        return res.status(404).json({
          success: false,
          message: 'Folder not found'
        });
      }
      
      res.json({
        success: true,
        data: folder
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Delete folder
   */
  async deleteFolder(req, res, next) {
    try {
      const { id } = req.params;
      
      const result = await folderService.deleteFolder(id, req.user._id);
      
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Folder not found'
        });
      }
      
      res.json({
        success: true,
        message: `Deleted folder and ${result.deletedCount - 1} subfolders`
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get bookmarks in a folder
   */
  async getFolderBookmarks(req, res, next) {
    try {
      const { id } = req.params;
      const { 
        page = DEFAULT_PAGE, 
        limit = DEFAULT_LIMIT,
        sort_by = 'added_at',
        sort_order = 'desc'
      } = req.query;
      
      // Validate and normalize pagination params
      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), MAX_LIMIT);
      
      // Check if folder exists
      const folder = await folderService.getFolderById(id, req.user._id);
      
      if (!folder) {
        return res.status(404).json({
          success: false,
          message: 'Folder not found'
        });
      }
      
      const result = await folderService.getFolderBookmarks(id, req.user._id, {
        page: pageNum,
        limit: limitNum,
        sort_by,
        sort_order
      });
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Add bookmark to folder
   */
  async addBookmarkToFolder(req, res, next) {
    try {
      const { id: folderId, bookmarkId } = req.params;
      
      const result = await folderService.addBookmarkToFolder(bookmarkId, folderId, req.user._id);
      
      res.status(201).json({
        success: true,
        message: 'Bookmark added to folder'
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Remove bookmark from folder
   */
  async removeBookmarkFromFolder(req, res, next) {
    try {
      const { id: folderId, bookmarkId } = req.params;
      
      const result = await folderService.removeBookmarkFromFolder(bookmarkId, folderId, req.user._id);
      
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Bookmark not found in this folder'
        });
      }
      
      res.json({
        success: true,
        message: 'Bookmark removed from folder'
      });
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get folders containing a bookmark
   */
  async getBookmarkFolders(req, res, next) {
    try {
      const { id: bookmarkId } = req.params;
      
      const folders = await folderService.getBookmarkFolders(bookmarkId, req.user._id);
      
      res.json({
        success: true,
        data: folders
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = folderController;