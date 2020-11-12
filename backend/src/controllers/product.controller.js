const Product = require('../models/product');
const slugify = require('slugify');
const Category = require('../models/category');

/**
 * @desc function to create a product
 * @param req
 * @param res
 */
exports.createProduct = (req, res) => {
    // destructure the request body
    const {price, description, name, quantity, createdBy, category} = req.body;

    // initialize an empty productPictures variable
    let productPictures;

    // check if the file is not empty
    if (req.file.length > 0)
        // loop through the files and add it to the variable
        productPictures = req.files.map(file => {
            return req.file.filename
        });

    // instantiate a new Product class
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        category,
        createdBy: req.user._id
    });

    // save the product to the DB
    product.save((error, product) => {
        // if error exists, return error
        if (error) return res.status(400).json({error});

        // if product is present, return the product object
        if (product) return res.status(200).json({product})
    });
}

/**
 * @desc Function to fetch all the products from slug
 * @param req
 * @param res
 */
exports.getProductBySlug = (req, res) => {
    // get slug from param
    const {slug} = req.params;

    // find category from slug
    Category.findOne({slug: slug})
        .select('_id')
        .exec((error, category) => {
            // if error, return the error
            if (error) return res.status(400).json({error});

            // if category is found, fetch the products from category id
            if (category) {
                Product.find({category: category._id})
                    .exec((error, products) => {
                       // if error, return the error
                        if (error) return res.status(400).json({error});

                        // check if the products array is greater than 0
                        if (products.length > 0)
                            // return all products and products by price
                            return res.status(200).json({
                            products,
                            productsByPrice: {
                                under5k: products.filter(product => product.price <= 5000),
                                under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                                under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                                under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                                under30k: products.filter(product => product.price > 20000 && product.price <= 30000)
                            }
                        });
                    });
            }
        });
}

/**
 * @desc Function to get the product based on id
 * @param req
 * @param res
 * @returns {any}
 */
exports.getProductDetailById = (req, res) => {
    // get product id from the request parameter
    const {productId} = req.params;

    // check if product id is present or not
    if (productId) {
        Product.findOne({_id: productId})
            .exec((error, product) => {
                // if error is present, return the error
                if (error) return res.status(400).json({error});

                // if product is fetched return the product
                if (product) return res.status(200).json({error});
            });
    } else
        return res.status(400).json({message: 'Params Required'});
}
