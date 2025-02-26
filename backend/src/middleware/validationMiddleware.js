
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateRegistration = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateRequest
];

const validateLogin = [
    body('email').isEmail().withMessage('Invalid email'),   
    body('password').exists().withMessage('Password is required'),
    validateRequest
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateRequest
};