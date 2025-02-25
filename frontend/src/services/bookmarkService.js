// FILE: frontend/src/services/bookmarkService.js
import api from './api';
import { API_ENDPOINTS } from '../../shared/constants/api';

/**
 * Service for bookmark-related API operations
 */
const bookmarkService = {
  /**
   * Get all bookmarks with pagination and filters
   * @param {import('../../shared/types/apiTypes').BookmarkQueryParams} params - Query parameters
   * @returns {Promise<import('../../shared/types/apiTypes').PaginatedResponse>} Paginated bookmarks
   */
  async getAllBookmarks(params = {}) {
    const response = await api.get(API_ENDPOINTS.BOOKMARKS.BASE, { params });
    return response.data;
  },

  /**
   * Create a new bookmark
   * @param {import('../../shared/types/bookmarkTypes').BookmarkCreateInput} bookmark - Bookmark data
   * @returns {Promise<import('../../shared/types/apiTypes').ApiResponse>} Created bookmark
   */
  async createBookmark(bookmark) {
    const response = await api.post(API_ENDPOINTS.BOOKMARKS.BASE, bookmark);
    return response.data;
  },

  /**
   * Get bookmark by ID
   * @param {string} id - Bookmark ID
   * @returns {Promise<import('../../shared/types/apiTypes').ApiResponse>} Bookmark data
   */
  async getBookmarkById(id) {
    const response = await api.get(API_ENDPOINTS.BOOKMARKS.DETAIL(id));
    return response.data;
  },

  /**
   * Update bookmark
   * @param {string} id - Bookmark ID
   * @param {import('../../shared/types/bookmarkTypes').BookmarkUpdateInput} data - Update data
   * @returns {Promise<import('../../shared/types/apiTypes').ApiResponse>} Updated bookmark
   */
  async updateBookmark(id, data) {
    const response = await api.put(API_ENDPOINTS.BOOKMARKS.DETAIL(id), data);
    return response.data;
  },

  /**
   * Delete bookmark
   * @param {string} id - Bookmark ID
   * @returns {Promise<import('../../shared/types/apiTypes').ApiResponse>} Result
   */
  async deleteBookmark(id) {
    const response = await api.delete(API_ENDPOINTS.BOOKMARKS.DETAIL(id));
    return response.data;
  },

  /**
   * Get reading list
   * @param {import('../../shared/types/apiTypes').BookmarkQueryParams} params - Query parameters
   * @returns {Promise<import('../../shared/types/apiTypes').PaginatedResponse>} Reading list
   */
  async getReadingList(params = {}) {
    const response = await api.get(API_ENDPOINTS.BOOKMARKS.READING_LIST, { params });
    return response.data;
  },

  /**
   * Search bookmarks
   * @param {string} query - Search query
   * @param {import('../../shared/types/apiTypes').BookmarkQueryParams} params - Other query parameters
   * @returns {Promise<import('../../shared/types/apiTypes').PaginatedResponse>} Search results
   */
  async searchBookmarks(query, params = {}) {
    const response = await api.get(API_ENDPOINTS.BOOKMARKS.SEARCH, { 
      params: { search: query, ...params } 
    });
    return response.data;
  },

  /**
   * Get all tags
   * @returns {Promise<import('../../shared/types/apiTypes').ApiResponse>} Tags list
   */
  async getAllTags() {
    const response = await api.get(API_ENDPOINTS.BOOKMARKS.TAGS);
    return response.data;
  },

  /**
   * Get recent bookmarks
   * @param {number} limit - Number of bookmarks to retrieve
   * @returns {Promise<import('../../shared/types/apiTypes').ApiResponse>} Recent bookmarks
   */
  async getRecentBookmarks(limit = 5) {
    const response = await api.get(API_ENDPOINTS.BOOKMARKS.MOST_RECENT, { 
      params: { limit } 
    });
    return response.data;
  }
};

export default bookmarkService;
