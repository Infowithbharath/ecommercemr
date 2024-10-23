const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    productType: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType', required: true },
    images: [{ type: String }], // Multiple images
    mrpPrice: { type: Number, required: true },
    discount: { type: Number, required: true }, // Percentage discount
    discountedPrice: { type: Number, required: true }, // Automatically calculated
    description: { type: String },
    colors: [{ type: String }], // Multiple colors
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
