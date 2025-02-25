// FILE: shared/types/noteTypes.js

/**
 * @typedef {Object} Note
 * @property {string} _id - Note ID
 * @property {string} content - Note content (markdown)
 * @property {string} bookmark_id - Related bookmark ID
 * @property {string} user_id - User ID who owns the note
 * @property {Date} created_at - Creation date
 * @property {Date} updated_at - Last update date
 */

/**
 * @typedef {Object} NoteCreateInput
 * @property {string} content - Note content
 * @property {string} bookmark_id - Related bookmark ID
 */

/**
 * @typedef {Object} NoteUpdateInput
 * @property {string} [content] - Note content
 */

// Export empty object since we're just defining types with JSDoc
module.exports = {};
