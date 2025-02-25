const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { authResponse, generateToken } = require('../utils/auth');


const authController = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

               // Create user with Mongoose (not Prisma)
               const user = new User({
                email,
                password: hashedPassword,
                name,
                settings: {
                    theme: 'system',
                    default_view: 'list'
                }
            });

            await user.save();

            // Generate token
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET || 'your-secret-key-for-development',
                { expiresIn: '30d' }
            );

            // Return user without password
            const userResponse = {
                id: user._id,
                email: user.email,
                name: user.name,
                settings: user.settings
            };

            res.status(201).json({ token, user: userResponse });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken(user.id);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: ErrorCode.SERVER_ERROR,
                message: 'Server error',
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            })
        }
            },
            logout: async (req, res) => {
                try {
                    res.clearCookie('token');
                    res.status(200).json({ message: 'Logout successful' });
                } catch (error) {
                    res.status(500).json({ message: 'Server error' });
                }
    },
               // Add the missing getProfile function
    getProfile: async (req, res) => {
        try {
            // User is attached by the authMiddleware
            const user = req.user;
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Return user data (without password)
            res.status(200).json({
                id: user._id,
                email: user.email,
                name: user.name,
                settings: user.settings,
                created_at: user.created_at
            });
        } catch (error) {
            console.error('Profile error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = authController;
    