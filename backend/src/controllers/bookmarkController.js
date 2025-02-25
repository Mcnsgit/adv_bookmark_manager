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
  }

  // Other controller methods follow similar pattern...
};

module.exports = bookmarkController;