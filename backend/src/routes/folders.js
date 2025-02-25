//const express = require('express');
//const router = express.Router();
//const folderController = require('../controllers/folderController');
//const authMiddleware = require('../middleware/authMiddleware');

////apply auth middleware
//router.use(authMiddleware.verifyToken);

////folder routes
//router.get('/', folderController.getAllFolders);
//router.post('/', folderController.createFolder);
//router.get('/tree', folderController.getFolderTree);
//router.get('/:id', folderController.getFolderById);
//router.put('/:id', folderController.updateFolder);
//router.delete('/:id', folderController.deleteFolder);
//router.get('/:id/bookmarks', folderController.getBookmarksInFolder);
//router.post('/:id/bookmarks/:bookmarkId', folderController.addBookmarkToFolder);
//router.delete('/:id/bookmarks/:bookmarkId', folderController.removeBookmarkFromFolder);

//module.exports = router;