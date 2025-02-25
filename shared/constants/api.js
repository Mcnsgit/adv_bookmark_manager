// FILE: shared/constants/api.js

/**
 * API version
 * @type {string}
 */
const API_VERSION = 'v1';

/**
 * Base API URL based on environment
 * @type {string}
 */
const BASE_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-project-name.glitch.me/api'
  : 'http://localhost:5173/api';

/**
 * API endpoints for all services
 * @type {Object}
 */
const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  
  // Bookmark endpoints
  BOOKMARKS: {
    BASE: '/bookmarks',
    DETAIL: (id) => `/bookmarks/${id}`,
    READING_LIST: '/bookmarks/reading-list',
    FAVICON: (id) => `/bookmarks/${id}/favicon`,
    SEARCH: '/bookmarks/search',
    TAGS: '/bookmarks/tags',
    MOST_RECENT: '/bookmarks/recent',
  },
  
  // Folder endpoints
  FOLDERS: {
    BASE: '/folders',
    DETAIL: (id) => `/folders/${id}`,
    TREE: '/folders/tree',
    BOOKMARKS: (id) => `/folders/${id}/bookmarks`,
    ADD_BOOKMARK: (id, bookmarkId) => `/folders/${id}/bookmarks/${bookmarkId}`,
    REMOVE_BOOKMARK: (id, bookmarkId) => `/folders/${id}/bookmarks/${bookmarkId}`,
  },
  
  // Note endpoints
  NOTES: {
    BASE: '/notes',
    DETAIL: (id) => `/notes/${id}`,
    BY_BOOKMARK: (bookmarkId) => `/bookmarks/${bookmarkId}/notes`,
  },
  
  // User endpoints
  USERS: {
    SETTINGS: '/users/settings',
    EXPORT_DATA: '/users/export',
    IMPORT_DATA: '/users/import',
  },
};

module.exports = {
  API_VERSION,
  BASE_API_URL,
  API_ENDPOINTS
};