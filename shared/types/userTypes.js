// FILE: shared/types/userTypes.js

/**
 * @typedef {Object} UserSettings
 * @property {'light' | 'dark' | 'system'} theme - User interface theme
 * @property {'grid' | 'list'} default_view - Default view mode
 */

/**
 * @typedef {Object} User
 * @property {string} _id - User ID
 * @property {string} email - User email address
 * @property {string} username - User username
 * @property {Date} created_at - User creation date
 * @property {UserSettings} settings - User preferences
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {Object} RegisterCredentials
 * @property {string} email - User email
 * @property {string} username - Username
 * @property {string} password - User password
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - JWT token
 * @property {User} user - User information
 */

// Export empty object since we're just defining types with JSDoc
module.exports = {};