//const express = require('express')
//const router = express.Router()
//const noteController = require('../controllers/noteController')
//const authMiddleware = require('../middleware/authMiddleware')

////apply auth middleware
//router.use(authMiddleware.verifyToken);

////note routes
//router.get('/', noteController.getAllNotes);
//router.post('/', noteController.createNote);
//router.get('/:id', noteController.getNoteById);
//router.put('/:id', noteController.updateNote);
//router.delete('/:id', noteController.deleteNote);

////notes by bookmark id
//router.get('/bookmark/:bookmarkId', noteController.getNotesByBookmarkId);

//module.exports = router