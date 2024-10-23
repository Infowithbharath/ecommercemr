// controllers/categoryController.js
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? req.file.path : null;

        // Validate inputs
        if (!name || !image) {
            return res.status(400).json({ error: 'Name and image are required.' });
        }

        const category = new Category({ name, image });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Invalid request' });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log('Categories found:', categories);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get the category ID from the request parameters
        const { name } = req.body; // Get the new name from the request body
        const image = req.file ? req.file.path : null; // Check if an image was uploaded

        // Validate inputs
        if (!name && !image) {
            return res.status(400).json({ error: 'At least one field (name or image) is required.' });
        }

        const updateData = {};
        if (name) updateData.name = name; // Update name if provided
        if (image) updateData.image = image; // Update image if provided

        const category = await Category.findByIdAndUpdate(id, updateData, { new: true }); // Update the category and return the updated document

        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.json(category); // Respond with the updated category
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message || 'Invalid request' });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get the category ID from the request parameters
        const category = await Category.findByIdAndDelete(id); // Delete the category

        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.json({ message: 'Category deleted successfully.' }); // Respond with success message
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
