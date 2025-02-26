const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all bookmark routes
router.use(authMiddleware.verifyToken);

// Define routes with proper controller functions
router.get('/', bookmarkController.getAllBookmarks);
router.post('/', bookmarkController.createBookmark);


 router.get('/search', bookmarkController.searchBookmarks);
 router.get('/tags', bookmarkController.getAllTags);
// router.get('/recent', bookmarkController.getRecentBookmarks);
// router.get('/:id/favicon', bookmarkController.getBookmarkFavicon);
 router.get('/:id', bookmarkController.getBookmarkById);
 router.put('/:id', bookmarkController.updateBookmark);
 router.delete('/:id', bookmarkController.deleteBookmark);
 router.get('/reading-list', bookmarkController.getReadingList);

module.exports = router;