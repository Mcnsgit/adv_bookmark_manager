// FILE: shared/types/apiTypes.js

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {*} [data] - Response data
 * @property {string} [error] - Error code
 * @property {string} [message] - Human-readable message
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success - Whether the request was successful
 * @property {Array} [data] - Array of items
 * @property {string} [error] - Error code
 * @property {string} [message] - Human-readable message
 * @property {number} total - Total number of items
 * @property {number} page - Current page
 * @property {number} limit - Items per page
 * @property {number} pages - Total number of pages
 */

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

/**
 * @typedef {Object} ObsidianLink
 * @property {'bookmark'|'note'} type - Link type
 * @property {string} id - Item ID
 * @property {string} title - Item title
 * @property {string} [url] - URL (for bookmarks)
 */

// Export empty object since we're just defining types with JSDoc
module.exports = {};