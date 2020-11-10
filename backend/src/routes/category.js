const express = require('express');
const {addCategory, getCategories} = require('../controllers/category.controller');

const router = express.Router();

router.post('/category/create', addCategory);
router.get('/category/all', getCategories);

module.exports = router;
