// routes/categoryRoutes.js
const express = require('express');
const multer = require('multer'); // For handling file uploads
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

router.post('/', upload.single('image'), createCategory); // Create category
router.get('/', getCategories); // Get all categories
router.put('/:id', upload.single('image'), updateCategory); // Update category by ID
router.delete('/:id', deleteCategory); // Delete category by ID

module.exports = router;
