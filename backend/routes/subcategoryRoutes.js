const express = require("express");
const router = express.Router();
const multer = require("multer");
const subcategoryController = require("../controllers/subcategoryController");

// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Directory where files should be saved
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname); // Unique file name
	},
});

const upload = multer({ storage });

// Define the routes with their corresponding controller methods
router.post(
	"/",
	upload.single("image"),
	subcategoryController.createSubcategory
);
router.get("/:categoryId", subcategoryController.getSubcategories);
router.get("/", subcategoryController.getAllSubcategories);
router.put(
	"/:id",
	upload.single("image"),
	subcategoryController.updateSubcategory
);
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
