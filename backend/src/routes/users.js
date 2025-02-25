const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.verifyToken);

//user routes
router.get('/settings', userController.getUserSettings);
router.put('/settings', userController.updateUserSettings);
//router.get('/export', userController.exportUserData);
//router.post('/import', userController.importUserData);

module.exports = router;
