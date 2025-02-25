// FILE: shared/constants/validation.js

/**
 * Regular expression for URL validation
 * @type {RegExp}
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

/**
 * Maximum length for bookmark titles
 * @type {number}
 */
const MAX_BOOKMARK_TITLE_LENGTH = 200;

/**
 * Maximum length for bookmark descriptions
 * @type {number}
 */
const MAX_BOOKMARK_DESCRIPTION_LENGTH = 500;

/**
 * Maximum length for a tag
 * @type {number}
 */
const MAX_TAG_LENGTH = 50;

/**
 * Maximum length for folder names
 * @type {number}
 */
const MAX_FOLDER_NAME_LENGTH = 100;

/**
 * Maximum number of tags per bookmark
 * @type {number}
 */
const MAX_TAGS_PER_BOOKMARK = 20;

module.exports = {
  URL_REGEX,
  MAX_BOOKMARK_TITLE_LENGTH,
  MAX_BOOKMARK_DESCRIPTION_LENGTH,
  MAX_TAG_LENGTH,
  MAX_FOLDER_NAME_LENGTH,
  MAX_TAGS_PER_BOOKMARK
};