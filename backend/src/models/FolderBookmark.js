// models/FolderBookmark.js
const mongoose = require('mongoose');

const FolderBookmarkSchema = new mongoose.Schema({
  folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    required: true
  },
  bookmark_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookmark',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  added_at: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure unique folder-bookmark combinations
FolderBookmarkSchema.index({ folder_id: 1, bookmark_id: 1 }, { unique: true });

const FolderBookmark = mongoose.model('FolderBookmark', FolderBookmarkSchema);

module.exports = FolderBookmark;