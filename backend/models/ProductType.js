const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    image: { type: String, required: true }, // Image for the product type
});

module.exports = mongoose.model('ProductType', productTypeSchema);
