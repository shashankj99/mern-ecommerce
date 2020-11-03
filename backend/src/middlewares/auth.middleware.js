const jwt = require('jsonwebtoken');

/**
 * Middleware to check whether the token is present in the header parameter or not
 * @param req
 * @param res
 * @param next
 * @returns {any}
 */
exports.auth = (req, res, next) => {
    // if token is empty return the unauthorized response
    if (!req.headers.authorization) return res.status(401).json({message: 'Unauthorized...!'});

    // get the token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // verify the token received from the request header
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    // continue the request
    next();
}
