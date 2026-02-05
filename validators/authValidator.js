const {body} = require('express-validator');

const loginValidation = [
      body('email')
        .trim()
        .notEmpty()
        .withMessage('Username or email is required')
        .isLength({ min: 3 })
        .withMessage('Username or email must be at least 3 characters long'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]

module.exports = {
    loginValidation
}