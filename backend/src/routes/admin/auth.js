const express = require('express');
const {register, login} = require('../../controllers/admin/auth.controller');
const {validateRegistrationRequest, validateLoginRequest, isRequestValidated} = require('../../validators/auth');

const router = express.Router();

router.post('/admin/register', validateRegistrationRequest, isRequestValidated, register);
router.post('/admin/login', validateLoginRequest, isRequestValidated, login);

module.exports = router;
