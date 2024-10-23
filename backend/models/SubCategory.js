const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Link to category
    image: { type: String, required: true }, // Image for the subcategory
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
