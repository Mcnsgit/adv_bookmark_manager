const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const bookmarkRoutes = require('./bookmarks');
const folderRoutes = require('./folders');
//const noteRoutes = require('./notes');
const userRoutes = require('./users');

//mount all routes
router.use('/auth', authRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/folders', folderRoutes);
//router.use('/notes', noteRoutes);
router.use('/users', userRoutes);

//root endpoint
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the bookmanager API',
        version: '1.0.0',
        status: 'ok'
     });
});

module.exports = router;