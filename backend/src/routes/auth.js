const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
//const { requiresAuth } = require('express-openid-connect');

router.post('/login', authController.login); // Fixed typo
router.post('/logout', authController.logout);



// Protect routes
router.get('/me', authMiddleware.verifyToken, authController.getProfile);
//router.get('/', (req, res) => { 
//  res.render('index', {
//    title: 'Auth0 Webapp sample Nodejs',
//    isAuthenticated: req.oidc.isAuthenticated()
//  });
//});
//router.get('/profile', requiresAuth(), (req, res) => { 
//  res.render('profile', {
//    userProfile: req.oidc.user,
//    title: 'Profile page'
//  });
//});
module.exports = router;