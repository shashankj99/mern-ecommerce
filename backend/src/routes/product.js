const express = require('express');
const {createProduct, getProductBySlug, getProductDetailById} = require('../controllers/product.controller')
const {auth, adminMiddleware} = require('../middlewares/auth.middleware');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

const router = express.Router();

/**
 * @desc store the files in the uploads folder inside src directory
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({storage});

router.post('/product/create', auth, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/products/:slug', getProductBySlug);
router.get('/product/:productId', getProductDetailById);

module.exports = router;
