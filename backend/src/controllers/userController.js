// controllers/userController.js
const User = require('../models/User.js');

const userController = {
  // Get user settings
  getUserSettings: async (req, res) => {
    try {
      // User is already attached to req by authMiddleware
      const user = req.user;
      
      res.status(200).json({
        success: true,
        data: user.settings
      });
    } catch (error) {
      console.error('Get settings error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },
  
  // Update user settings
  updateUserSettings: async (req, res) => {
    try {
      const { theme, default_view } = req.body;
      
      // Update user settings
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { 
          settings: {
            theme: theme || req.user.settings.theme,
            default_view: default_view || req.user.settings.default_view
          }
        },
        { new: true }
      );
      
      res.status(200).json({
        success: true,
        data: updatedUser.settings
      });
    } catch (error) {
      console.error('Update settings error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
  
  // Add other user controller methods as needed
};

module.exports = userController;