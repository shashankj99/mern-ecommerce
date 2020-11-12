const Category = require('../models/category');
const slugify = require('slugify');

/**
 * @desc function to create a list of categories with its children elements,
 *       children elements are the ones having parentId
 * @param categories
 * @param parentId
 * @returns {[]}
 */
function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

    // check if parentId is present or not
    if (parentId === null)
        // if parentId is undefined, then filter the categories without parentId
        category = categories.filter(cat => cat.parentId === undefined);
    else
        // if category is present then filter with parentId
        category = categories.filter(cat => cat.parentId === parentId.toString());

    // loop through the categories and create an object with children if present
    for (let cate of category) {
        categoryList.push({
            _id: cate.id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;
}

/**
 * @desc function to add a category
 * @param req
 * @param res
 */
exports.addCategory = (req, res) => {
    // create a category object
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };

    // check if parentId is present in the request
    if (req.body.parentId)
        // add parentId to the category object
        categoryObj.parentId = req.body.parentId;

    // instantiate a new Category model with the category object
    const cat = new Category(categoryObj);

    // save the object to the DB
    cat.save((error, category) => {
        // if error return the error
        if (error) return res.status(400).json({error});

        // if category is created, return the created category
        if (category) return res.status(200).json({category});
    })
}
/**
 * @desc function to fetch all the created categories
 * @param req
 * @param res
 */
exports.getCategories = (req, res) => {
    // find all the categories
    Category.find({})
        .exec((error, categories) => {
            // if error return error
            if (error) res.status(400).json({error});

            // if found all the categories, return the categories
            if (categories) {
                // get the category list from the function and return it
                const categoryList = createCategories(categories);
                res.status(200).json({categoryList});
            }
        })
}