// models/bookmark.js
const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    default: function () { returnthis.url; },
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  favicon: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  in_reading_list: {
    type: Boolean,
    default: false
  },
  reading_priority: {
    type: Number,
    min: 1,
    max: 3,
    default: null
  },
  pinned: {
    type: Boolean,
    default: false
  }
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports = Bookmark;