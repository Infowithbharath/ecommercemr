import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import cartService from "../services/cartService";
import productService from "../services/productService";
import "./Cart.css";

const CartPage = () => {
	const [cart, setCart] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate(); // Initialize useNavigate

	useEffect(() => {
		const cartItems = cartService.getCart();
		setCart(cartItems);
	}, []);

	const handleQuantityChange = (productId, quantity) => {
		if (quantity < 1) return;

		cartService.updateCart(productId, quantity);

		// Update the cart state to trigger re-render and recalculate total prices
		const updatedCart = cartService.getCart().map((item) => {
			if (item.productId === productId) {
				// Update the total price of this item based on the new quantity
				return { ...item, quantity: quantity };
			}
			return item;
		});

		setCart(updatedCart);
	};

	const handleRemoveItem = (productId) => {
		cartService.removeFromCart(productId);
		setCart(cartService.getCart());
	};

	const calculateTotalPrice = () => {
		return cart.reduce(
			(total, item) => total + item.discountedPrice * item.quantity,
			0
		);
	};

	const openModal = async (productId) => {
		try {
			const product = await productService.getProductById(productId);
			setSelectedProduct(product);
			setShowModal(true);
		} catch (error) {
			console.error("Error fetching product details:", error);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedProduct(null);
	};

	const proceedToCheckout = () => {
		navigate("/checkout", { state: { cart } }); // Navigate to checkout page and pass the cart as state
	};

	return (
		<div className="luxury-cart-container">
			<header className="luxury-cart-header">
				<h1 className="luxury-cart-title">MRIJYO'S Cart</h1>
				<p className="luxury-cart-subtitle">Curated for Feeling Tradition</p>
			</header>

			{cart.length > 0 ? (
				<div className="luxury-cart-content">
					<div className="luxury-cart-items">
						{cart.map((item) => (
							<div key={item._id} className="luxury-cart-item">
								<div className="luxury-item-details">
									<h2
										className="luxury-item-name clickable"
										onClick={() => openModal(item.productId)}>
										{item.name}
									</h2>
									<p className="luxury-item-price">₹{item.discountedPrice}</p>
									<div className="luxury-quantity-section">
										<label>Quantity:</label>
										<div className="luxury-quantity-input-container">
											<button
												className="luxury-quantity-button"
												onClick={() =>
													handleQuantityChange(
														item.productId,
														item.quantity - 1
													)
												}>
												-
											</button>
											<input
												type="number"
												value={item.quantity}
												readOnly
												className="luxury-quantity-input"
											/>
											<button
												className="luxury-quantity-button"
												onClick={() =>
													handleQuantityChange(
														item.productId,
														item.quantity + 1
													)
												}>
												+
											</button>
										</div>
									</div>
									<button
										className="luxury-remove-button"
										onClick={() => handleRemoveItem(item.productId)}>
										Remove
									</button>
								</div>

								<div className="luxury-item-total">
									<p>Total: ₹{item.discountedPrice * item.quantity}</p>
								</div>
							</div>
						))}
					</div>

					<div className="luxury-cart-summary-card">
						<div className="luxury-cart-summary">
							<h2 className="luxury-summary-title">Order Summary</h2>
							<p className="luxury-total-price">
								Total: ₹{calculateTotalPrice()}
							</p>
							<button
								className="luxury-checkout-button"
								onClick={proceedToCheckout}>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			) : (
				<p className="luxury-empty-cart">Your cart is empty</p>
			)}

			{showModal && selectedProduct && (
				<div className="luxury-modal">
					<div className="luxury-modal-content">
						<h2>{selectedProduct.name}</h2>
						<p>Description: {selectedProduct.description}</p>
						<p>Price: ₹{selectedProduct.discountedPrice}</p>
						<button className="luxury-modal-close-button" onClick={closeModal}>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
