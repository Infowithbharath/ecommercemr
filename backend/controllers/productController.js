// Import the Product model
const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { category, subcategory, productType, name, mrpPrice, discount, description, colors, quantity } = req.body;

        // Ensure images are an array
        const images = req.files ? req.files.map(file => file.path) : [];

        // Calculate discounted price
        const discountedPrice = mrpPrice - (mrpPrice * discount / 100);

        const newProduct = new Product({
            category,
            subcategory,
            productType,
            name,
            images,
            mrpPrice,
            discount,
            discountedPrice,
            description,
            colors,
            quantity
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
};

// Update Product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { category, subcategory, productType, name, mrpPrice, discount, description, colors, quantity } = req.body;

        // Fetch existing images or set to empty if not available
        let images = req.body.images ? req.body.images : []; 

        if (req.files) {
            const uploadedImages = req.files.map(file => file.path); // Newly uploaded images
            images = images.concat(uploadedImages); // Merge old and new images
        }

        // Calculate discounted price
        const discountedPrice = mrpPrice - (mrpPrice * discount / 100);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                category,
                subcategory,
                productType,
                name,
                images,
                mrpPrice,
                discount,
                discountedPrice,
                description,
                colors,
                quantity
            },
            { new: true, runValidators: true } // Use `runValidators` to validate data before update
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
};

