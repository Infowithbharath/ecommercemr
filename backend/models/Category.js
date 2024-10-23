const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // URL or file path of the image
});

module.exports = mongoose.model('Category', categorySchema);
