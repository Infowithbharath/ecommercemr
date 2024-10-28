import React, { useState, useEffect } from "react";
import api from "../services/api"; // Import your API file

const ProductForm = ({ productToEdit, onUpdate }) => {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [subcategory, setSubcategory] = useState("");
	const [productType, setProductType] = useState("");
	const [mrpPrice, setMrpPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [discountedPrice, setDiscountedPrice] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [colors, setColors] = useState([]);
	const [images, setImages] = useState(null);
	const [categories, setCategories] = useState([]);
	const [subcategories, setSubcategories] = useState([]);
	const [productTypes, setProductTypes] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		if (productToEdit) {
			setName(productToEdit.name || "");
			setCategory(productToEdit.category || "");
			setSubcategory(productToEdit.subcategory || "");
			setProductType(productToEdit.productType || "");
			setMrpPrice(productToEdit.mrpPrice || "");
			setDiscount(productToEdit.discount || "");
			setDiscountedPrice(productToEdit.discountedPrice || "");
			setDescription(productToEdit.description || "");
			setQuantity(productToEdit.quantity || "");
			setColors(productToEdit.colors || []);
		}
	}, [productToEdit]);

	const fetchCategories = async () => {
		try {
			const res = await api.get("/categories");
			setCategories(res.data);
		} catch (err) {
			console.error("Error fetching categories:", err);
		}
	};

	const handleCategoryChange = async (e) => {
		const categoryId = e.target.value;
		setCategory(categoryId);
		if (!categoryId) {
			setSubcategories([]); // Reset subcategories if no category is selected
			return;
		}

		try {
			const res = await api.get(`/subcategories/${categoryId}`);
			console.log("Fetched subcategories:", res.data);
			if (res.data && Array.isArray(res.data)) {
				setSubcategories(res.data);
			} else {
				console.error("Unexpected response format:", res.data);
				setSubcategories([]); // Reset if unexpected data format
			}
		} catch (err) {
			console.error("Error fetching subcategories:", err);
			setSubcategories([]); // Reset in case of an error
		}
	};

	const handleSubcategoryChange = async (e) => {
		const subcategoryId = e.target.value;
		setSubcategory(subcategoryId);
		try {
			const res = await api.get(`/productTypes/${subcategoryId}`);
			setProductTypes(res.data);
		} catch (err) {
			console.error("Error fetching product types:", err);
		}
	};

	const handleImageChange = (e) => {
		setImages(e.target.files);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("category", category);
		formData.append("subcategory", subcategory);
		formData.append("productType", productType);
		formData.append("mrpPrice", mrpPrice);
		formData.append("discount", discount);
		formData.append("description", description);
		formData.append("quantity", quantity);
		formData.append("colors", colors.join(","));

		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}
		}

		try {
			if (productToEdit) {
				// Editing an existing product
				await api.put(`/product/${productToEdit._id}`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				alert("Product updated successfully!");
				onUpdate();
			} else {
				// Creating a new product
				await api.post("/product", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				alert("Product created successfully!");
			}
		} catch (err) {
			console.error(
				"Error submitting product:",
				err.response ? err.response.data : err.message
			);
		}
	};

	return (
		<div>
			<h2>{productToEdit ? "Edit Product" : "Add Product"}</h2>
			<form onSubmit={handleSubmit}>
				<select onChange={handleCategoryChange} value={category}>
					<option value="">Select Category</option>
					{categories.map((cat) => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
				<select onChange={handleSubcategoryChange} value={subcategory}>
					<option value="">Select Subcategory</option>
					{subcategories.map((subcat) => (
						<option key={subcat._id} value={subcat._id}>
							{subcat.name}
						</option>
					))}
				</select>
				<select
					onChange={(e) => setProductType(e.target.value)}
					value={productType}>
					<option value="">Select Product Type</option>
					{productTypes.map((prodType) => (
						<option key={prodType._id} value={prodType._id}>
							{prodType.name}
						</option>
					))}
				</select>
				<input
					type="text"
					placeholder="Product Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="number"
					placeholder="MRP Price"
					value={mrpPrice}
					onChange={(e) => setMrpPrice(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Discount (%)"
					value={discount}
					onChange={(e) => {
						const discountValue = e.target.value;
						setDiscount(discountValue);
						const newDiscountedPrice =
							mrpPrice - (mrpPrice * discountValue) / 100;
						setDiscountedPrice(newDiscountedPrice);
					}}
				/>
				<input
					type="number"
					placeholder="Discounted Price"
					value={discountedPrice}
					readOnly
				/>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Colors (comma separated)"
					value={colors.join(",")}
					onChange={(e) => setColors(e.target.value.split(","))}
				/>
				<input type="file" onChange={handleImageChange} multiple />
				<button type="submit">
					{productToEdit ? "Update Product" : "Add Product"}
				</button>
			</form>
		</div>
	);
};

export default ProductForm;
