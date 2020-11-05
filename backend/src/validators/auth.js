const {check, validationResult} = require('express-validator');

exports.validateRegistrationRequest = [
    check('firstName')
        .notEmpty().withMessage('First Name is required'),
    check('lastName')
        .notEmpty().withMessage('Last Name is required'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('The Email must be valid'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password Must be at least 6 characters in length'),
];

exports.validateLoginRequest = [
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('The Email must be valid'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password Must be at least 6 characters in length'),
];

exports.isRequestValidated = (req, res, next) => {
    // get the validation errors
    const errors = validationResult(req);

    // check if validation errors exist
    if (errors.array().length > 0)
        return res.status(403).json({ error: errors.array()[0].msg });

    // forward the request
    next();
}
