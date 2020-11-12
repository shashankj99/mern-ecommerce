const express = require('express');
const {addCategory, getCategories} = require('../controllers/category.controller');
const {auth, adminMiddleware} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/category/create', auth, adminMiddleware, addCategory);
router.get('/category/all', getCategories);

module.exports = router;
