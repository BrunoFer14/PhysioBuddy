const { body, validationResult } = require('express-validator');

const validateUser = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.details = errors.array(); // Attach validation errors
      return next(error); // Forward the error to the error handler
    }
    next(); // No errors, move to the next middleware or controller
  }
];

module.exports = validateUser;