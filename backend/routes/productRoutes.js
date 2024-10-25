const express = require("express");
const {
	createProduct,
	getProducts,
	updateProduct,
	deleteProduct, // Import deleteProduct
} = require("../controllers/productController");
const { uploadMultiple } = require("../middlewares/upload"); // Import the new middleware
const router = express.Router();

// POST route for creating product with multiple image upload
router.post("/", uploadMultiple, createProduct);

// GET route for fetching products
router.get("/", getProducts);

// PUT route for updating product with multiple image upload
router.put("/:id", uploadMultiple, updateProduct);

// DELETE route for deleting a product by ID
router.delete("/:id", deleteProduct); // Add delete route

// Search products by keyword (name, description, etc.)
router.get("/search", async (req, res) => {
	const searchTerm = req.query.q;
	try {
		const products = await Product.find({
			name: { $regex: searchTerm, $options: "i" },
		});
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Error fetching products" });
	}
});

module.exports = router;
