const express = require('express');
const {
  createProductType,
  getProductTypes,
  updateProductType,
  deleteProductType,
  getAllProductTypes,
  getProductTypesBySubcategory // Import the missing function
} = require('../controllers/productTypeController'); // Ensure this is the correct path
const { getSubcategories } = require('../controllers/subcategoryController');
const { uploadSingle } = require('../middlewares/upload');
const router = express.Router();

// Route to create a new product type
router.post('/', uploadSingle, createProductType);

// Route to fetch all product types
router.get('/', getAllProductTypes);

// Route to fetch product types by subcategory ID
router.get('/:subcategoryId', getProductTypes);

// Route to update a product type by ID
router.put('/:id', uploadSingle, updateProductType);

// Route to delete a product type by ID
router.delete('/:id', deleteProductType);

// Route to get subcategories by category ID
router.get('/subcategories/:categoryId', getSubcategories);

// Route to get product types by subcategory ID (specific endpoint)
router.get('/product-types/:subcategoryId', getProductTypesBySubcategory);

module.exports = router;
