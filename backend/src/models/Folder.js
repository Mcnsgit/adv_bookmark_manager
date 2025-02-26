// models/Folder.js
const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Add virtual for getting child folders
FolderSchema.virtual('children', {
  ref: 'Folder',
  localField: '_id',
  foreignField: 'parent_id'
});

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;