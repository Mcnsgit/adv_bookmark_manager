const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/test', (req, res) => {
    res.json({ message: 'This endpoint works without authentication' });
})
// Apply auth middleware to all bookmark routes
router.use(authMiddleware.verifyToken);

// Define routes with proper controller functions
router.get('/', bookmarkController.getAllBookmarks);
router.post('/', bookmarkController.createBookmark);


router.get('/reading-list', bookmarkController.getReadingList);
router.get('/search', bookmarkController.searchBookmarks);
router.get('/tags', bookmarkController.getAllTags);
// router.get('/recent', bookmarkController.getRecentBookmarks);
// router.get('/:id/favicon', bookmarkController.getBookmarkFavicon);
router.get('/:id', bookmarkController.getBookmarkById);
router.put('/:id', bookmarkController.updateBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;