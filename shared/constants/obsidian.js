// FILE: shared/constants/obsidian.js

/**
 * Regular expression for matching Obsidian links
 * @type {RegExp}
 */
const OBSIDIAN_LINK_REGEX = /\[\[(.*?)\]\]/g;

/**
 * Format for Obsidian bookmark links
 * @type {string}
 */
const OBSIDIAN_BOOKMARK_LINK_FORMAT = '[[bookmark:{{id}}|{{title}}]]';

/**
 * Format for Obsidian note links
 * @type {string}
 */
const OBSIDIAN_NOTE_LINK_FORMAT = '[[note:{{id}}|{{title}}]]';

module.exports = {
  OBSIDIAN_LINK_REGEX,
  OBSIDIAN_BOOKMARK_LINK_FORMAT,
  OBSIDIAN_NOTE_LINK_FORMAT
};

// FILE: shared/constants/errors.js