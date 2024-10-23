import React, { useState, useEffect } from "react";
import api from "../services/api";
import ProductTypeForm from "./ProductTypeForm"; // Import the form component
import "./producttype.css"; // Import the CSS file
const apiUrl = process.env.REACT_APP_BASE_URL;

const ProductTypeList = () => {
	const [productTypes, setProductTypes] = useState([]);
	const [selectedProductType, setSelectedProductType] = useState(null);

	useEffect(() => {
		const fetchProductTypes = async () => {
			try {
				const res = await api.get("/productTypes"); // Fetch all product types
				setProductTypes(res.data);
			} catch (error) {
				console.error("Error fetching product types:", error);
			}
		};

		fetchProductTypes();
	}, []);

	const handleEdit = (productType) => {
		setSelectedProductType(productType);
	};

	const handleCancelEdit = () => {
		setSelectedProductType(null);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this product type?")) {
			try {
				await api.delete(`/productTypes/${id}`);
				alert("Product Type deleted successfully");
				setProductTypes((prev) => prev.filter((type) => type._id !== id)); // Remove deleted product type from the list
			} catch (error) {
				console.error("Error deleting product type:", error);
			}
		}
	};

	return (
		<div className="product-types-container">
			<h1>Product Types</h1>
			<ProductTypeForm productType={selectedProductType} />
			<ul className="product-types-list">
				{productTypes.map((type) => (
					<li key={type._id}>
						<h3>{type.name}</h3>
						{type.image && (
							<img src={`${apiUrl}/${type.image}`} alt={type.name} />
						)}
						<div className="product-type-actions">
							<button onClick={() => handleEdit(type)}>Edit</button>
							<button
								className="delete-button"
								onClick={() => handleDelete(type._id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
			{selectedProductType && (
				<button onClick={handleCancelEdit}>Cancel Edit</button>
			)}
		</div>
	);
};

export default ProductTypeList;
