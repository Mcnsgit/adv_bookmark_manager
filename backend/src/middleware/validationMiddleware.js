const { body, validationResult } = require('express-validator');
const validateToken = require('./authMiddleware');

const validateToken = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const validateRegistration = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateToken
]

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email'),   
    body('password'),
    validateToken
]
module.exports = validateToken;