// FILE: backend/src/controllers/bookmarkController.js
const bookmarkService = require('../services/bookmarkService.js');
const metadataService = require('../services/metadataService');
const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../../../shared/constants/pagination');
const { ErrorCode } = require('../../../shared/constants/errors');

const bookmarkController = {

  // SECTION: GETALL  
  async getAllBookmarks(req, res, next) {
    try {
      const { 
        page = 1, 
        limit = 20,
        search,
        tags,
        in_reading_list,
        reading_priority,
        sort_by = 'created_at',
        sort_order = 'desc'
      } = req.query;
       // Then, parse and validate the pagination params after you've declared them
    const pageNum = parseInt(page, 10);
    const limitNum = Math.min(parseInt(limit, 10), 100);
      const parsedTags = tags ? (Array.isArray(tags) ? tags : [tags]) : undefined;
      const inReadingList = in_reading_list === 'true' ? true : in_reading_list === 'false' ? false : undefined;
      const priorityNum = reading_priority ? parseInt(reading_priority, 10) : undefined;
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


  // SECTION: CREATEBOOKMARK
  async createBookmark(req, res, next) {
    try {
      const { url, title, description, tags, in_reading_list, reading_priority, pinned, folder_ids } = req.body;
      if (!url) {
        return res.status(400).json({
          success: false,
          error: ErrorCode.VALIDATION_ERROR,
          message: 'URL is required'
        });
      }
      let bookmarkData = { url, title, description, tags, in_reading_list, reading_priority, pinned };
      if (!title || !description) {
        try {
          const metadata = await metadataService.fetchMetadata(url);
          bookmarkData.title = title || metadata.title;
          bookmarkData.description = description || metadata.description;
          bookmarkData.favicon = metadata.favicon;
        } catch (error) {
          console.error('Metadata fetching failed:', error);
          bookmarkData.title = title || url;
        }
      }
      const bookmark = await bookmarkService.createBookmark(req.user._id, bookmarkData);
      if (folder_ids && Array.isArray(folder_ids) && folder_ids.length > 0) {
        await Promise.all(
          folder_ids.map(folderId => 
            bookmarkService.addBookmarkToFolder(bookmark._id, folderId, req.user._id)
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


  // SECTION: SEARCH
  async searchBookmarks(req, res, next) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Query is required'
        });
      }
      const results = await bookmarkService.searchBookmarks(req.user._id, query);
      if (!results || results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No bookmarks found'
        });
      }
      res.json({
        success: true,
        data: results
      });
    } catch (error) {
      next(error);
    }
  },
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
  async getBookmarkById(req, res, next) {
    try {
      const { id } = req.params;
      const bookmark = await bookmarkService.getBookmarkById(id, req.user._id);
      if (!bookmark) {
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
    }
  },


  // SECTION: UPDATE
  async updateBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, tags, in_reading_list, reading_priority, pinned } = req.body;
      const existingBookmark = await bookmarkService.getBookmarkById(id, req.user._id);
      if (!existingBookmark) {
        return res.status(404).json({
          success: false,
          message: 'Bookmark not found'
        });
      }
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

  // SECTION: DELETE
  async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid bookmark ID format.' });
      }
      const result = await bookmarkService.deleteBookmark(id, req.user._id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Bookmark not found' });
      }
      res.status(200).json({ message: 'Bookmark deleted successfully.' });
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      next(error);
    }
  },
  async getReadingList(req, res, next) {
    try {
      const { 
        page = DEFAULT_PAGE, 
        limit = DEFAULT_LIMIT,
        reading_priority,
        sort_by = 'reading_priority',
        sort_order = 'desc'
      } = req.query;
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(Math.max(1, parseInt(limit, 10) || DEFAULT_LIMIT), MAX_LIMIT);
      const priorityNum = reading_priority ? parseInt(reading_priority, 10) : undefined;
      const result = await bookmarkService.getAllBookmarks(req.user._id, {
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