import React, { useEffect, useState } from "react";
import api from "../services/api"; // Ensure this path is correct
import "./product.css"; // Import the CSS file

const ProductForm = ({ productToEdit, onUpdate }) => {
	const [name, setName] = useState("");
	const [mrpPrice, setMrpPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [quantity, setQuantity] = useState("");
	const [image, setImage] = useState(null);

	useEffect(() => {
		if (productToEdit) {
			setName(productToEdit.name);
			setMrpPrice(productToEdit.mrpPrice);
			setDiscount(productToEdit.discount);
			setQuantity(productToEdit.quantity);
			setImage(productToEdit.image); // Assuming you have an image URL
		}
	}, [productToEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const productData = { name, mrpPrice, discount, quantity, image };

		if (productToEdit) {
			// Update existing product
			await api.put(`/product/${productToEdit._id}`, productData);
		} else {
			// Add new product
			await api.post("/product", productData);
		}

		onUpdate();
		resetForm();
	};

	const resetForm = () => {
		setName("");
		setMrpPrice("");
		setDiscount("");
		setQuantity("");
		setImage(null);
	};

	return (
		<form className="category-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Product Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="MRP Price"
				value={mrpPrice}
				onChange={(e) => setMrpPrice(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Discount"
				value={discount}
				onChange={(e) => setDiscount(e.target.value)}
				required
			/>
			<input
				type="text"
				placeholder="Quantity"
				value={quantity}
				onChange={(e) => setQuantity(e.target.value)}
				required
			/>
			<input
				type="file"
				onChange={(e) => setImage(e.target.files[0])} // Handle image upload
				accept="image/*"
			/>
			<button type="submit">
				{productToEdit ? "Update Product" : "Add Product"}
			</button>
		</form>
	);
};

export default ProductForm;
