const User = require('../../models/user');
const jwt = require('jsonwebtoken');

/**
 * Method to register a new admin
 * @param req
 * @param res
 */
exports.register = (req, res) => {
    // check if the user already exists or not
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            // if exists return error with the required message
            if (user)
                return res.status(400).json({
                    message: 'Admin already Exists...!'
                });

            // destructure the request body
            const {firstName, lastName, email, password} = req.body;

            // create a new user instance
            const _user = new User({
                firstName, lastName, email, password,
                username: lastName + '_' + firstName,
                role: 'admin'
            });

            // save the user info
            _user.save((error, data) => {
               if (error)
                   return res.status(400).json({
                       message: error.message
                   });

               return res.status(201).json({
                   message: 'Admin created successfully...!'
               });
            });
        });
}

/**
 * Login Method for admin
 * @param req
 * @param res
 */
exports.login = (req, res) => {
    // find the user based on email
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            // throw error if user not found
            if (error) return res.status(400).json({message: error.message});

            // check if the password is similar
            if (user.authenticate(req.body.password) && user.role === 'admin') {
                // generate a json web token that expires in an hour
                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});

                // destructure the user object
                const {_id, firstName, lastName, email, role, fullName} = user;

                return res.status(200).json({
                    token,
                    user: {_id, firstName, lastName, fullName, email, role}
                });
            } else {
                // return invalid password message
                return res.status(400).json({
                    message: 'Invalid Password...!'
                });
            }
        });
}
