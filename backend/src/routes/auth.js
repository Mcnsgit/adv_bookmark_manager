const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
//const { requiresAuth } = require('express-openid-connect');

router.post('/register', authController.register);
router.post('/login', authController.login); // Fixed typo
router.post('/logout', authController.logout);

router.get('/user', authMiddleware.verifyToken, authController.getProfile);


// Protect routes
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