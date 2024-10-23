const express = require('express');
const { createProduct, getProducts, updateProduct } = require('../controllers/productController');
const { uploadSingle, uploadMultiple } = require('../middlewares/upload'); // Import the new middleware
const Product = require('../models/Product');
const router = express.Router();

// POST route for creating product with multiple image upload
router.post('/', uploadMultiple, createProduct);

// GET route for fetching products
router.get('/', getProducts); 

// PUT route for updating product with multiple image upload
router.put('/:id', uploadMultiple, updateProduct); 

// Search products by keyword (name, description, etc.)
router.get('/search', async (req, res) => {
const searchTerm = req.query.q;
  try {
    const products = await Product.find({
      name: { $regex: searchTerm, $options: 'i' },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});
module.exports = router;