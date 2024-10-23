const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

router.post("/", subcategoryController.createSubcategory);
router.get("/:categoryId", subcategoryController.getSubcategories);
router.get("/", subcategoryController.getAllSubcategories);
router.put("/:id", subcategoryController.updateSubcategory);
router.delete("/:id", subcategoryController.deleteSubcategory); // Ensure this is correctly pointing to deleteSubcategory

module.exports = router;
