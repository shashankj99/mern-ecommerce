const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        price: {
          type: Number,
          required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        offer: {type: Number},
        productPictures: [
            {img: {type: String}}
        ],
        reviews: [
            {
                userId: {type: mongoose.Schema.Types.ObjectID, ref: 'user'},
                review: String
            }
        ],
        category: {type: mongoose.Schema.Types.ObjectID, ref: 'Category'},
        createdBy: {type: mongoose.Schema.Types.ObjectID, ref: 'user'}
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', productSchema);
