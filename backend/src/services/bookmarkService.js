const Bookmark = require('../models/Bookmark');
const { ERROR_CODES, API_ENDPOINTS } = require('../../../shared/constants');


const bookmarkService = {
    /**
     * GEt all bookmarks with pagination and filters
     */

    async getBookmarks(userId, options = {}) {
        const {
            page = 1,
            limit = 10,
            search,
            tags,
            in_reading_list,
            reading_priority,
            sort_by = 'created_at',
            sort_order = 'desc'
        } = options;
            

        //calculate pagination
        const skip = (page - 1) * limit;
        // build query filters
        const filter = { user_id: userId };

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { url: { $regex: search, $options: 'i' } }
            ];
        }

        //add tags filter if provided
        if (tags && tags.length > 0) {
            filter.tags = { $in: tags };
        }


        //add reading list filter if provided
        if (typeof in_reading_list !== 'undefined') {
            filter.in_reading_list = in_reading_list;
        }
        

        //add reading priority filter if provided
        if (typeof reading_priority !== 'undefined') {
            filter.reading_priority = reading_priority;
        }

        //build sortOptions 
        const sortOptions = {};
        sortOptions[sort_by] = sort_order === 'asc' ? 1 : -1;

        //execute query with pagination

        const bookmarks = await Bookmark.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean();
        
        // get total count for pagination
        const total = await Bookmark.countDocuments(filter);

        return {
            success: true,
            data: bookmarks,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / limit)
        };
    },

    /**
     * create a new bookmark
     */

  async createBookmark(userId, bookmarkData) {
    console.log('Creatingbookmark with data ', JSON.stringify(bookmarkData));
    console.log('for user id', userId);

    try {
        const bookmark = new Bookmark({
            ...bookmarkData,
            user_id: userId
        });
      console.log('Bookmark modelcreated:', bookmark);
      
      const existingBookmark = await Bookmark.findOne({
        url: bookmarkData.url,
        user_id: userId
      });
      
      if (existingBookmark) {
        console.log('Bookmark with this URL already exists for user');
        return existingBookmark;
      }
      const savedBookmark = await bookmark.save();
      console.log('Bookmark savedsuccessfully:', savedBookmark);


        return bookmark;
    }catch (error) {
        console.error('Error saving bookmark:', error);
        throw error;
    }
  },

    /**
     * get bookmark by ID
     */
    async getBookmarkById(id, userId) {
        return await Bookmark.findOne({
            _id: id,
            user_id: userId
        }).lean();
    },

    /**
     * Update bookmark
     */
    async updateBookmark(id, userId, updateData) {
        //update timestamp
        updateData.updated_at = new Date();

        const updatedBookmark = await Bookmark.findOneAndUpdate(
            { _id: id, user_id: userId },
            { $set: updateData },
            { new: true }
        ).lean();

        return updatedBookmark;
    },

    /**
     * Delete bookmark
     */
    async deleteBookmark(id, userId) {
        return await Bookmark.deleteOne({ _id: id, user_id: userId})
    },
     /**
   * Search bookmarks
   */
  async searchBookmarks(userId, query) {
    return await Bookmark.find({
      user_id: userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { url: { $regex: query, $options: 'i' } }
      ]
    }).lean();
  },
  
  /**
   * Get all unique tags for a user
   */
  async getAllTags(userId) {
    const bookmarks = await Bookmark.find({ user_id: userId }).select('tags');
    
    // Extract unique tags
    const tagsSet = new Set();
    bookmarks.forEach(bookmark => {
      if (Array.isArray(bookmark.tags)) {
        bookmark.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    
    return Array.from(tagsSet).sort();
  },
  
  /**
   * Get reading list
   */
  async getReadingList(userId, options = {}) {
    return await this.getAllBookmarks(userId, {
      ...options,
      in_reading_list: true
    });
  }

};

module.exports = bookmarkService;
