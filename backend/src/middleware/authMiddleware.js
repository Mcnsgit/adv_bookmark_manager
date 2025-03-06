// middleware/authMiddleware.js
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const authMiddleware = {
verifyToken: async (req, res, next) => {
    try {
    console.log('Headers', req.headers);
    // Get token from header - Access the lowercase version
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    // Get token without Bearer prefix
      const token = authHeader.split(' ')[1];
      console.log('Token:', token); // Debug log

    
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-for-development'
    );
      console.log('Decoded token:', decoded);
    
    // Find user by id from token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    // Attach user to request object
    req.user = user;
    next();
    } catch (error) {
      console.error('Auth error', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}
};

module.exports = authMiddleware;