import React, { useRef, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import "./ProductTypeSlider.css";
import productService from "../services/productService";
import { SubcategoryContext } from "../components/SubcategoryContext"; // Import the context
import sareeImage from "./Mrijyo_Logo[1].png";

const ProductTypeSlider = ({ onProductTypeSelect }) => {
	const sliderRef = useRef(null);
	const [productTypes, setProductTypes] = useState([]);
	const [filteredProductTypes, setFilteredProductTypes] = useState([]);
	const { selectedSubcategory } = useContext(SubcategoryContext); // Use the context
	const apiUrl = process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		const fetchProductTypes = async () => {
			try {
				const types = await productService.getAllProductTypes();
				setProductTypes(types || []); // Store all product types, default to empty array
				setFilteredProductTypes(types || []); // Initially, show all product types
			} catch (error) {
				console.error("Error fetching product types:", error);
			}
		};

		fetchProductTypes();
	}, []);

	useEffect(() => {
		// This effect runs whenever the selectedSubcategory changes
		if (selectedSubcategory) {
			// Filter product types based on selected subcategory
			const filteredTypes = productTypes.filter(
				(type) => type.subcategory === selectedSubcategory
			);
			setFilteredProductTypes(filteredTypes);
		} else {
			// No subcategory selected, show all product types
			setFilteredProductTypes(productTypes);
		}
	}, [selectedSubcategory, productTypes]);

	return (
		<div className="product-type-slider-container">
			<h2 className="slider-heading">Browse by Category</h2>

			<div className="slider-wrapper">
				<button
					className="slider-arrow left-arrow"
					onClick={() =>
						sliderRef.current.scrollBy({
							left: -sliderRef.current.clientWidth * 0.5,
							behavior: "smooth",
						})
					}>
					&#9664;
				</button>

				<div className="product-type-slider" ref={sliderRef}>
					<div
						className="product-type-card all-products-card"
						onClick={() => {
							onProductTypeSelect(null); // Select all products
							setFilteredProductTypes(productTypes); // Show all product types
						}}>
						<div className="card-content">
							<img
								src={sareeImage} // Use the imported image here
								alt="All Products"
								className="product-type-image"
							/>
							<p>All Products</p>
						</div>
					</div>

					{filteredProductTypes.map((productType) => (
						<div
							className="product-type-card"
							key={productType._id}
							onClick={() => onProductTypeSelect(productType._id)}>
							<div className="card-content">
								<img
									src={`${apiUrl}/${productType.image}`}
									alt={productType.name}
									className="product-type-image"
								/>
								<p>{productType.name}</p>
							</div>
						</div>
					))}
				</div>

				<button
					className="slider-arrow right-arrow"
					onClick={() =>
						sliderRef.current.scrollBy({
							left: sliderRef.current.clientWidth * 0.5,
							behavior: "smooth",
						})
					}>
					&#9654;
				</button>
			</div>
		</div>
	);
};

ProductTypeSlider.propTypes = {
	onProductTypeSelect: PropTypes.func.isRequired,
};

export default ProductTypeSlider;
