// routes/folders.js
const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController.js');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all folder routes
router.use(authMiddleware.verifyToken);

// Folder routes
router.get('/', folderController.getAllFolders);
router.post('/', folderController.createFolder);
router.get('/:id', folderController.getFolderById);
router.put('/:id', folderController.updateFolder);
router.delete('/:id', folderController.deleteFolder);

// Folder-bookmark relationship routes
router.get('/:id/bookmarks', folderController.getFolderBookmarks);
router.post('/:id/bookmarks/:bookmarkId', folderController.addBookmarkToFolder);
router.delete('/:id/bookmarks/:bookmarkId', folderController.removeBookmarkFromFolder);

// Bookmark folders route
router.get('/bookmark/:id', folderController.getBookmarkFolders);

module.exports = router;