// FILE: shared/types/folderTypes.js

/**
 * @typedef {Object} Folder
 * @property {string} _id - Folder ID
 * @property {string} name - Folder name
 * @property {string|null} parent_id - Parent folder ID or null for root folders
 * @property {string} user_id - User ID who owns the folder
 * @property {Date} created_at - Creation date
 * @property {Date} updated_at - Last update date
 */

/**
 * @typedef {Object} FolderWithPath
 * @property {string} _id - Folder ID
 * @property {string} name - Folder name
 * @property {string|null} parent_id - Parent folder ID or null for root folders
 * @property {string} user_id - User ID who owns the folder
 * @property {Date} created_at - Creation date
 * @property {Date} updated_at - Last update date
 * @property {string} path - Full path (e.g., "Root/Subfolder/Current")
 */

/**
 * @typedef {Object} FolderCreateInput
 * @property {string} name - Folder name
 * @property {string|null} [parent_id] - Parent folder ID
 */

/**
 * @typedef {Object} FolderUpdateInput
 * @property {string} [name] - Folder name
 * @property {string|null} [parent_id] - Parent folder ID
 */

/**
 * @typedef {Object} FolderBookmark
 * @property {string} _id - Relation ID
 * @property {string} folder_id - Folder ID
 * @property {string} bookmark_id - Bookmark ID
 * @property {Date} added_at - When bookmark was added to folder
 */


module.exports = {};