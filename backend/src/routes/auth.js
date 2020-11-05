const express = require('express');
const {register, login} = require('../controllers/auth.controller');
const {validateRegistrationRequest, validateLoginRequest, isRequestValidated} = require('../validators/auth');

const router = express.Router();

router.post('/register', validateRegistrationRequest, isRequestValidated, register);
router.post('/login', validateLoginRequest, isRequestValidated, login);

module.exports = router;
