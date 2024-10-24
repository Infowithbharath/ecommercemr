const Subcategory = require("../../backend/models/SubCategory");

// Create Subcategory
exports.createSubcategory = async (req, res) => {
	try {
		const { name, category } = req.body;
		const image = req.file ? req.file.path : null;

		console.log("Name:", name);
		console.log("Category:", category);
		console.log("Image path:", image);

		if (!name || !category || !image) {
			return res
				.status(400)
				.json({ error: "Name, category, and image are required." });
		}

		const subcategory = new Subcategory({ name, category, image });
		await subcategory.save();
		res.status(201).json(subcategory);
	} catch (error) {
		console.error("Error creating subcategory:", error);
		res.status(500).json({ error: error.message || "Internal Server Error" });
	}
};

// Get Subcategories by Category ID
exports.getSubcategories = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const subcategories = await Subcategory.find({ category: categoryId });
		res.json(subcategories);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getAllSubcategories = async (req, res) => {
	try {
		const subcategories = await Subcategory.find();
		res.json(subcategories);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update Subcategory
exports.updateSubcategory = async (req, res) => {
	try {
		const { name, category } = req.body;
		const image = req.file ? req.file.path : null;

		const subcategory = await Subcategory.findById(req.params.id);

		if (!subcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}

		subcategory.name = name || subcategory.name;
		subcategory.category = category || subcategory.category;
		if (image) {
			subcategory.image = image;
		}

		await subcategory.save();
		res.json(subcategory);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

		if (!deletedSubcategory) {
			return res.status(404).json({ message: "Subcategory not found" });
		}
		res.status(200).json({ message: "Subcategory deleted successfully" });
	} catch (error) {
		console.error("Error deleting subcategory:", error);
		res.status(500).json({ message: "Server error" });
	}
};
