import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./producttype.css"; // Import the CSS file

const ProductTypeForm = ({ productType }) => {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [subcategory, setSubcategory] = useState("");
	const [image, setImage] = useState(null);
	const [currentImage, setCurrentImage] = useState("");
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const isEditMode = !!productType;

	useEffect(() => {
		fetchCategories();
		if (productType) {
			setName(productType.name);
			setCategory(productType.category._id || productType.category); // Assuming category is populated with ID
			setSubcategory(productType.subcategory._id || productType.subcategory); // Assuming subcategory is populated with ID
			setCurrentImage(productType.image); // Show current image name
			setImage(null); // Clear the image field to allow re-upload if needed
			fetchSubcategories(productType.category); // Fetch subcategories based on the selected category
		}
	}, [productType]);

	const fetchCategories = async () => {
		try {
			const res = await api.get("/categories");
			setCategories(res.data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	const fetchSubcategories = async (categoryId) => {
		try {
			const res = await api.get(`/subcategories/${categoryId}`);
			setSubcategories(res.data);
		} catch (error) {
			console.error("Error fetching subcategories:", error);
		}
	};

	const handleCategoryChange = (e) => {
		const categoryId = e.target.value;
		setCategory(categoryId);
		setSubcategory(""); // Reset subcategory when a new category is selected
		fetchSubcategories(categoryId); // Fetch new subcategories based on the selected category
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("category", category);
		formData.append("subcategory", subcategory);
		if (image) {
			formData.append("image", image);
		}

		try {
			if (isEditMode) {
				await api.put(`/productTypes/${productType._id}`, formData); // Edit product type
			} else {
				await api.post("/productTypes", formData); // Create new product type
			}
			alert(`Product Type ${isEditMode ? "updated" : "created"} successfully`);
			// Clear form after submission if needed
			setName("");
			setCategory("");
			setSubcategory("");
			setImage(null);
		} catch (error) {
			console.error("Error saving product type:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="product-type-form" onSubmit={handleSubmit}>
			<label htmlFor="name">Product Type Name</label>
			<input
				type="text"
				id="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<label htmlFor="category">Category</label>
			<select
				id="category"
				value={category}
				onChange={handleCategoryChange}
				required>
				<option value="">Select Category</option>
				{categories.map((cat) => (
					<option key={cat._id} value={cat._id}>
						{cat.name}
					</option>
				))}
			</select>
			<label htmlFor="subcategory">Subcategory</label>
			<select
				id="subcategory"
				value={subcategory}
				onChange={(e) => setSubcategory(e.target.value)}
				required>
				<option value="">Select Subcategory</option>
				{subcategories.map((sub) => (
					<option key={sub._id} value={sub._id}>
						{sub.name}
					</option>
				))}
			</select>
			<label htmlFor="image">Upload Image</label>
			<input type="file" accept="image/*" onChange={handleImageChange} />
			{currentImage && <p>Current Image: {currentImage}</p>}
			<button type="submit" disabled={loading}>
				{loading
					? "Saving..."
					: isEditMode
					? "Update Product Type"
					: "Create Product Type"}
			</button>
		</form>
	);
};

export default ProductTypeForm;
