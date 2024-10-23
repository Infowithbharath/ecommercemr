import React from "react";
import "./ProductCard.css"; // Import the CSS file

const ProductCard = ({ product, onPress }) => {
	const apiUrl = process.env.REACT_APP_BASE_URL;
	const imageSrc =
		product.images && product.images.length > 0
			? `${apiUrl}/${product.images}`
			: `${apiUrl}/default-image.jpg`;

	const discount = product.mrpPrice - product.discountedPrice;
	const discountPercentage = ((discount / product.mrpPrice) * 100).toFixed(0);

	return (
		<div className="card" onClick={() => onPress(product)}>
			<img src={imageSrc} alt={product.name} className="image" />
			<div className="details">
				<h3 className="name">{product.name}</h3>
				<p className="price">
					₹{product.discountedPrice}{" "}
					<span className="originalPrice">₹{product.mrpPrice}</span>
				</p>
				<p className="discount">Save {discountPercentage}%</p>
			</div>
			<button className="button">Product View</button>
		</div>
	);
};

export default ProductCard;
