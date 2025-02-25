// FILE: shared/types/bookmarkTypes.js

/**
 * @typedef {Object} Bookmark
 * @property {string} _id - Bookmark ID
 * @property {string} url - Bookmark URL
 * @property {string} title - Bookmark title
 * @property {string} [description] - Bookmark description
 * @property {string} [favicon] - Bookmark favicon URL
 * @property {Date} created_at - Creation date
 * @property {Date} updated_at - Last update date
 * @property {string[]} tags - Array of tags
 * @property {string} user_id - User ID who owns the bookmark
 * @property {boolean} in_reading_list - Whether it's in reading list
 * @property {number|null} reading_priority - Priority level (1-3 or null)
 * @property {boolean} pinned - Whether bookmark is pinned
 */

/**
 * @typedef {Object} BookmarkCreateInput
 * @property {string} url - Bookmark URL
 * @property {string} [title] - Bookmark title
 * @property {string} [description] - Bookmark description
 * @property {string[]} [tags] - Array of tags
 * @property {boolean} [in_reading_list] - Whether it's in reading list
 * @property {number|null} [reading_priority] - Priority level (1-3 or null)
 * @property {boolean} [pinned] - Whether bookmark is pinned
 * @property {string[]} [folder_ids] - Folders to add the bookmark to
 */

/**
 * @typedef {Object} BookmarkUpdateInput
 * @property {string} [title] - Bookmark title
 * @property {string} [description] - Bookmark description
 * @property {string[]} [tags] - Array of tags
 * @property {boolean} [in_reading_list] - Whether it's in reading list
 * @property {number|null} [reading_priority] - Priority level (1-3 or null)
 * @property {boolean} [pinned] - Whether bookmark is pinned
 */

/**
 * @typedef {Object} BookmarkQueryParams
 * @property {number} [page] - Page number for pagination
 * @property {number} [limit] - Items per page
 * @property {string} [search] - Search term
 * @property {string[]} [tags] - Filter by tags
 * @property {boolean} [in_reading_list] - Filter by reading list status
 * @property {number} [reading_priority] - Filter by priority
 * @property {string} [folder_id] - Filter by folder
 * @property {'title'|'created_at'|'updated_at'|'reading_priority'} [sort_by] - Sort field
 * @property {'asc'|'desc'} [sort_order] - Sort direction
 */

// Export empty object since we're just defining types with JSDoc
module.exports = {};
