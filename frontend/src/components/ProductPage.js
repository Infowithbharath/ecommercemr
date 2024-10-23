import React, { useState } from "react";
import ProductList from "./ProductsList";
import "../App.css";

const ProductPage = () => {
	const [selectedType, setSelectedType] = useState(null); // State to hold selected product type

	const handleTypeSelect = (typeId) => {
		setSelectedType(typeId); // Update the selected type
	};

	return (
		<div className="product-page">
			{/* Product List */}
			<ProductList selectedType={selectedType} />
			<h2 className="section-heading"></h2>
		</div>
	);
};

export default ProductPage;
