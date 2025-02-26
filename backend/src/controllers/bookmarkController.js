// FILE: backend/src/controllers/bookmarkController.js
const bookmarkService = require('../services/bookmarkService.js');
const metadataService = require('../services/metadataService');
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../../../shared/constants/pagination');
const { ErrorCode } = require('../../../shared/constants/errors');

/**
 * Controller for bookmark-related routes
 */
const bookmarkController = {
  /**
   * Get all bookmarks
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next function
   */
  async getAllBookmarks(req, res, next) {
    try {
      const { 
        page = DEFAULT_PAGE, 
        limit = DEFAULT_LIMIT,
        search,
        tags,
        in_reading_list,
        reading_priority,
        sort_by = 'created_at',
        sort_order = 'desc'
      } = req.query;

      // Validate and normalize pagination params
      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), MAX_LIMIT);
      
      // Parse tags if provided
      const parsedTags = tags ? (Array.isArray(tags) ? tags : [tags]) : undefined;
      
      // Convert string to boolean
      const inReadingList = in_reading_list === 'true' ? true : 
                           in_reading_list === 'false' ? false : undefined;
      
      // Convert string to number for priority
      const priorityNum = reading_priority ? parseInt(reading_priority, 10) : undefined;

      // Get bookmarks with provided filters
      const result = await bookmarkService.getBookmarks(req.user._id, {
        page: pageNum,
        limit: limitNum,
        search,
        tags: parsedTags,
        in_reading_list: inReadingList,
        reading_priority: priorityNum,
        sort_by,
        sort_order
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create new bookmark
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next function
   */
  async createBookmark(req, res, next) {
    try {
      const { url, title, description, tags, in_reading_list, reading_priority, pinned, folder_ids } = req.body;

      // Validate URL
      if (!url) {
        return res.status(400).json({
          success: false,
          error: ErrorCode.VALIDATION_ERROR,
          message: 'URL is required'
        });
      }

      // If title not provided, fetch metadata from URL
      let bookmarkData = { url, title, description, tags, in_reading_list, reading_priority, pinned };
      
      if (!title || !description) {
        try {
          const metadata = await metadataService.fetchMetadata(url);
          bookmarkData.title = title || metadata.title;
          bookmarkData.description = description || metadata.description;
          bookmarkData.favicon = metadata.favicon;
        } catch (error) {
          // If metadata fetching fails, use URL as title
          bookmarkData.title = title || url;
        }
      }

      // Create the bookmark
      const bookmark = await bookmarkService.createBookmark(req.user._id, bookmarkData);

      // Add to folders if folder_ids provided
      if (folder_ids && Array.isArray(folder_ids) && folder_ids.length > 0) {
        await Promise.all(
          folder_ids.map(folderId => 
            bookmarkService.addBookmarkToFolder(bookmark._id, folderId)
          )
        );
      }

      res.status(201).json({
        success: true,
        data: bookmark
      });
    } catch (error) {
      next(error);
    }
  },
  /**
   * 
   * @param {searchBookmarks} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
    //searchBookmarks
  async searchBookmarks(req, res, next) {
      try {
          const { query } = req.query;

          if (!query) {
              return res.status(400).json({
                  success: false,
                  message: 'Search query is required'
              });
          }

          try {
              const results = await bookmarkService.searchBookmarks(req.user._id, query);
              if (!results) {
                  return res.status(404).json({
                      success: false,
                      message: 'No bookmarks found'
                  });
              }

              res.jsons({
                  success: true,
                  data: results
              });
          } catch (error) {
              next(error);
          }
      } catch (error) {
          next(error);
      }
    },
   /**
 * Get all tags
 */
async getAllTags(req, res, next) {
    try {
      const tags = await bookmarkService.getAllTags(req.user._id);
      
      res.json({
        success: true,
        data: tags
      });
    } catch (error) {
      next(error);
    }
  },
  
  
  
    //getRecentBookmarks
  
    //getBookmarkFavicon
  
    //getBookmarkById
  async getBookmarkById(req, res, next) {
      try {
          const { id } = req.params;

          const bookmark = await bookmarkService.getBookmarkById(id, req.user._id);

          if(!bookmark) {
              return res.status(404).json({
                  success: false,
                  message: 'Bookmark not found'
              });
          }

          res.status(200).json({
              success: true,
              data: bookmark
          });
      } catch (error) {
          next(error);
          res.status(500).json({
              success: false,
              message: 'Server error'
          })
      }
    },
  
    //updateBookmark
    async updateBookmark(req, res, next) {
        try {
          const { id } = req.params;
          const { title, description, tags, in_reading_list, reading_priority, pinned } = req.body;
          
          // Check if bookmark exists and belongs to user
          const existingBookmark = await bookmarkService.getBookmarkById(id, req.user._id);
          
          if (!existingBookmark) {
            return res.status(404).json({
              success: false,
              message: 'Bookmark not found'
            });
          }
          
          // Update bookmark
          const updatedBookmark = await bookmarkService.updateBookmark(
            id, 
            req.user._id,
            { title, description, tags, in_reading_list, reading_priority, pinned }
          );
          
          res.json({
            success: true,
            data: updatedBookmark
          });
        } catch (error) {
          next(error);
        }
      },
  
    //deleteBookmark
    async deleteBookmark(req, res, next) {
      try {
        const { id } = req.params;
         // Validate the ID format (assuming it's a string, you can use regex or other validation logic)
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid bookmark ID format.' });
      }
      const result = await bookmarkService.deleteBookmark(id);
      // Check if the bookmark was found and deleted
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Bookmark not found.' });
      }
      res.status(200).json({ message: 'Bookmark deleted successfully.', result });
    } catch (error) {
      console.error('Error deleting bookmark:', error); // Log the error for debugging
      next(error);
    }
    },
    /**
 * Get reading list
 */
async getReadingList(req, res, next) {
    try {
      const { 
        page = DEFAULT_PAGE, 
        limit = DEFAULT_LIMIT,
        reading_priority,
        sort_by = 'reading_priority',
        sort_order = 'desc'
      } = req.query;
      
      // Validate and normalize pagination params
      const pageNum = parseInt(page, 10);
      const limitNum = Math.min(parseInt(limit, 10), MAX_LIMIT);
      
      // Convert string to number for priority
      const priorityNum = reading_priority ? parseInt(reading_priority, 10) : undefined;
      
      const result = await bookmarkService.getReadingList(req.user._id, {
        page: pageNum,
        limit: limitNum,
        reading_priority: priorityNum,
        sort_by,
        sort_order
      });
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = bookmarkController;