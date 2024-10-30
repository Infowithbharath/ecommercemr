import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For handling routes
import ProductCard from "./ProductCard";
import ProductTypeSlider from "./ProductTypeSlider";
import productService from "../services/productService";
import cartService from "../services/cartService";
import "./ProductList.css"; // Import CSS for animations and styles

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedImage, setSelectedImage] = useState(""); // For image carousel
	const [selectedColor, setSelectedColor] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [sortOption, setSortOption] = useState("");
	const [searchTerm, setSearchTerm] = useState(""); // Add state for search input
	const [zoomedImage, setZoomedImage] = useState(null); // State for zoomed image

	const { searchQuery } = useParams(); // Get search term from URL params (optional)
	const apiUrl = process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const fetchedProducts = await productService.getProducts();
				setProducts(fetchedProducts);
				setAllProducts(fetchedProducts);

				// Filter products if there's a search query
				if (searchQuery) {
					handleSearch(searchQuery);
				}
			} catch (err) {
				console.error(err);
				setError("Failed to fetch products. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [searchQuery]);

	// Handle product type selection
	const handleProductTypeSelect = (typeId) => {
		if (typeId === null) {
			setProducts(allProducts);
		} else {
			const filteredProducts = allProducts.filter(
				(product) => product.productType === typeId
			);
			setProducts(filteredProducts);
		}
	};

	// Handle sorting change
	const handleSortChange = (e) => {
		const value = e.target.value;
		setSortOption(value);
		let sortedProducts = [...products];

		if (value === "low-to-high") {
			sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
		} else if (value === "high-to-low") {
			sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
		} else if (value === "recently-added") {
			sortedProducts.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
		}

		setProducts(sortedProducts);
	};

	// Handle search functionality
	const handleSearch = (term) => {
		setSearchTerm(term); // Update the searchTerm state
		if (term) {
			const filteredProducts = allProducts.filter((product) =>
				product.name.toLowerCase().includes(term.toLowerCase())
			);
			setProducts(filteredProducts);
		} else {
			setProducts(allProducts); // Reset to all products if search term is empty
		}
	};

	const handlePressProduct = (product) => {
		setSelectedProduct(product);
		setSelectedImage(product.images[0]); // Default to the first image
		setSelectedColor(product.colors ? product.colors[0] : "");
		setQuantity(1); // Reset quantity when a new product is selected
	};

	const handleCloseModal = () => {
		setSelectedProduct(null);
		setQuantity(1);
	};

	const handleAddToCart = (product) => {
		if (quantity > product.quantity) {
			alert(
				`You can only add up to ${product.quantity} units of this product.`
			);
			return;
		}

		const success = cartService.addToCart({
			productId: product._id,
			name: product.name,
			discountedPrice: product.discountedPrice,
			quantity,
			color: selectedColor,
		});

		if (!success) {
			alert("Failed to add product to cart. Please try again.");
		} else {
			alert("Product added to cart successfully!");
		}
	};

	const handleImageClick = (image) => {
		setSelectedImage(image);
		handleZoomImage(image); // Add zoom functionality
	};

	const handleZoomImage = (image) => {
		setZoomedImage(image); // Set zoomed image
	};

	const handleQuantityChange = (type) => {
		if (type === "increase" && quantity < selectedProduct.quantity) {
			setQuantity((prev) => prev + 1);
		} else if (type === "decrease" && quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	if (loading) {
		return <div style={styles.loadingSpinner}></div>;
	}

	if (error) {
		return <div style={styles.error}>{error}</div>;
	}

	return (
		<div style={styles.container}>
			<ProductTypeSlider onProductTypeSelect={handleProductTypeSelect} />

			<h1 style={styles.heading}>Our Exclusive Products</h1>

			{/* Search Box */}
			<div style={styles.searchContainer}>
				<input
					type="text"
					placeholder="Search for products..."
					value={searchTerm}
					onChange={(e) => handleSearch(e.target.value)}
					style={styles.searchInput}
				/>
			</div>

			<div style={styles.sortContainer}>
				<label style={styles.sortLabel}>Sort By:</label>
				<select
					style={styles.sortSelect}
					value={sortOption}
					onChange={handleSortChange}>
					<option value="">Select</option>
					<option value="low-to-high">Price: Low to High</option>
					<option value="high-to-low">Price: High to Low</option>
				</select>
			</div>

			<div style={styles.grid}>
				{products.length > 0 ? (
					products.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
							onPress={handlePressProduct}
						/>
					))
				) : (
					<div>No products found matching your search.</div>
				)}
			</div>

			{selectedProduct && (
				<div style={styles.modalOverlay}>
					<div style={styles.modal}>
						<button style={styles.closeButton} onClick={handleCloseModal}>
							&times;
						</button>
						<div style={styles.modalLeft}>
							<img
								src={`${apiUrl}/${selectedImage}`}
								alt={selectedProduct.name}
								style={styles.modalImage}
							/>
							<div style={styles.thumbnailContainer}>
								{selectedProduct.images.map((image, index) => (
									<img
										key={index}
										src={`${apiUrl}/${image}`}
										alt={`Thumbnail ${index}`}
										style={styles.thumbnail}
										onClick={() => handleImageClick(image)}
									/>
								))}
							</div>
						</div>
						<div style={styles.modalRight}>
							<h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
							<p style={styles.modalDescription}>
								{selectedProduct.description}
							</p>
							<div style={styles.priceContainer}>
								<span style={styles.discountedPrice}>
									₹{selectedProduct.discountedPrice}
								</span>
								{selectedProduct.originalPrice && (
									<span style={styles.originalPrice}>
										₹{selectedProduct.originalPrice}
									</span>
								)}
							</div>
							<div style={styles.colorContainer}>
								<label style={styles.colorLabel}>Select Color:</label>
								<select
									value={selectedColor}
									onChange={(e) => setSelectedColor(e.target.value)}
									style={styles.colorSelect}>
									{selectedProduct.colors?.map((color, index) => (
										<option key={index} value={color}>
											{color}
										</option>
									))}
								</select>
							</div>
							<div style={styles.quantityContainer}>
								<button
									onClick={() => handleQuantityChange("decrease")}
									disabled={quantity <= 1}
									style={styles.quantityButton}>
									-
								</button>
								<span style={styles.quantity}>{quantity}</span>
								<button
									onClick={() => handleQuantityChange("increase")}
									disabled={quantity >= selectedProduct.quantity}
									style={styles.quantityButton}>
									+
								</button>
							</div>
							<button
								style={styles.addToCartButton}
								onClick={() => handleAddToCart(selectedProduct)}>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const styles = {
	container: {
		padding: "50px",
		backgroundColor: "#ffffff",
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
		borderRadius: "15px",
		margin: "20px auto",
		maxWidth: "1300px",
	},
	searchContainer: {
		marginBottom: "20px",
		display: "flex",
		justifyContent: "center",
	},
	searchInput: {
		width: "100%",
		maxWidth: "400px",
		padding: "10px",
		fontSize: "18px",
		borderRadius: "8px",
		border: "1px solid #ddd",
		outline: "none",
		transition: "border-color 0.3s",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
		gap: "20px",
		marginTop: "20px",
	},
	sortContainer: {
		display: "flex",
		justifyContent: "center",
		marginBottom: "20px",
	},
	sortLabel: {
		fontSize: "16px",
		marginRight: "10px",
	},
	sortSelect: {
		padding: "10px",
		fontSize: "16px",
		borderRadius: "8px",
		border: "1px solid #ddd",
	},
	heading: {
		textAlign: "center",
		fontSize: "24px",
		margin: "20px 0",
	},
	modalOverlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.85)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1000,
	},
	modal: {
		display: "flex",
		backgroundColor: "#fff",
		padding: "25px",
		borderRadius: "12px",
		maxWidth: "900px",
		width: "90%",
		boxShadow: "0 15px 40px rgba(0, 0, 0, 0.4)",
		position: "relative",
	},
	modalLeft: {
		flex: "1",
		marginRight: "20px",
	},
	modalRight: {
		flex: "2",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	modalImage: {
		width: "150px",
		height: "300px",
		objectFit: "cover",
		borderRadius: "10px",
		boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
	},
	closeButton: {
		position: "absolute",
		top: "15px",
		right: "20px",
		fontSize: "30px",
		color: "#333",
		cursor: "pointer",
		border: "none",
		background: "transparent",
	},
	modalTitle: {
		fontSize: "28px",
		margin: "15px 0",
		fontWeight: "bold",
	},
	modalDescription: {
		fontSize: "16px",
		color: "#777",
		lineHeight: "1.5",
	},
	priceContainer: {
		fontSize: "20px",
		fontWeight: "bold",
		color: "#e74c3c",
	},
	label: {
		fontSize: "16px",
		margin: "10px 0",
	},
	select: {
		padding: "10px",
		fontSize: "16px",
		borderRadius: "6px",
		border: "1px solid #ddd",
	},
	quantityContainer: {
		margin: "15px 0",
		display: "flex",
		alignItems: "center",
	},
	quantityInput: {
		width: "60px",
		padding: "5px",
		textAlign: "center",
		borderRadius: "6px",
		border: "1px solid #ddd",
		fontSize: "16px",
	},
	addToCartButton: {
		backgroundColor: "#e51d9c",
		color: "#fff",
		padding: "15px",
		borderRadius: "6px",
		border: "none",
		cursor: "pointer",
		fontSize: "18px",
		fontWeight: "bold",
		transition: "background-color 0.3s ease",
	},
	thumbnailContainer: {
		display: "flex",
		marginTop: "10px",
	},
	thumbnail: {
		width: "60px",
		height: "60px",
		objectFit: "cover",
		marginRight: "10px",
		borderRadius: "6px",
		cursor: "pointer",
	},
	quantityButton: {
		padding: "10px",
		backgroundColor: "#ddd",
		border: "none",
		fontSize: "18px",
		cursor: "pointer",
	},
	zoomModalOverlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.85)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1001, // Ensure it's above the main modal
	},
	zoomedImage: {
		maxWidth: "90%",
		maxHeight: "90%",
		borderRadius: "10px",
	},
};

export default ProductList;
