// FILE: shared/constants/index.js

// Re-export all constants from a single file for easier imports
const api = require('./api');
const pagination = require('./pagination');
const validation = require('./validation');
const readingList = require('./reading-list');
const themes = require('./themes');
const views = require('./views');
const obsidian = require('./obsidian');
const errors = require('./errors');

module.exports = {
  ...api,
  ...pagination,
  ...validation,
  ...readingList,
  ...themes,
  ...views,
  ...obsidian,
  ...errors
};