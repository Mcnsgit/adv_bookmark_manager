const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all bookmark routes
router.use(authMiddleware.verifyToken);

// Define routes with proper controller functions
// Make sure these functions are defined in your bookmarkController
router.get('/', bookmarkController.getAllBookmarks);
router.post('/', bookmarkController.createBookmark);

// If you have these routes, make sure the controller functions exist
// If you don't have them yet, comment them out until you implement them
// router.get('/reading-list', bookmarkController.getReadingList);
// router.get('/search', bookmarkController.searchBookmarks);
// router.get('/tags', bookmarkController.getAllTags);
// router.get('/recent', bookmarkController.getRecentBookmarks);
// router.get('/:id', bookmarkController.getBookmarkById);
// router.put('/:id', bookmarkController.updateBookmark);
// router.delete('/:id', bookmarkController.deleteBookmark);
// router.get('/:id/favicon', bookmarkController.getBookmarkFavicon);

module.exports = router;