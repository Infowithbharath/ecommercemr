const ProductType = require('../models/ProductType');

// Create Product Type
exports.createProductType = async (req, res) => {
  try {
    const { name, category, subcategory } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !category || !subcategory || !image) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const productType = new ProductType({ name, category, subcategory, image });
    await productType.save();
    res.status(201).json(productType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product Types by Subcategory ID
exports.getProductTypes = async (req, res) => {
  const subcategoryId = req.params.subcategoryId;

  try {
    const productTypes = await ProductType.find({ subcategory: subcategoryId });
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Product Types
exports.getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Product Type
exports.updateProductType = async (req, res) => {
  try {
    const { name, category, subcategory } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Use existing image if no new image is uploaded

    if (!name || !category || !subcategory) {
      return res.status(400).json({ error: 'Name, category, and subcategory are required.' });
    }

    const productType = await ProductType.findByIdAndUpdate(
      req.params.id,
      { name, category, subcategory, image },
      { new: true }
    );

    if (!productType) {
      return res.status(404).json({ error: 'Product Type not found.' });
    }

    res.json(productType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product Type
exports.deleteProductType = async (req, res) => {
  try {
    const productType = await ProductType.findByIdAndDelete(req.params.id);

    if (!productType) {
      return res.status(404).json({ error: 'Product Type not found.' });
    }

    res.json({ message: 'Product Type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getProductTypes = async (req, res) => {
//   try {
//     const subcategoryId = req.params.subcategoryId;
//     const productTypes = await ProductType.find({ subcategory: subcategoryId });
//     res.json(productTypes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getProductTypesBySubcategory = async (req, res) => {
  const { subcategoryId } = req.params;

  try {
    const productTypes = await ProductType.find({ subcategory: subcategoryId });
    if (!productTypes.length) {
      return res.status(404).json({ message: 'No product types found for this subcategory.' });
    }
    return res.json(productTypes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};