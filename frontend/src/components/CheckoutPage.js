import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cartService from "../services/cartService";
import "./Checkout.css";

const CheckoutPage = () => {
	const location = useLocation();
	const { cart } = location.state || { cart: [] };
	const navigate = useNavigate();

	const calculateTotalPrice = () => {
		return cart.reduce(
			(total, item) => total + item.discountedPrice * item.quantity,
			0
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const name = event.target.name.value;
		const phone = event.target.phone.value;
		const email = event.target.email.value || "N/A";
		const address = event.target.address.value;
		const landmark = event.target.landmark.value || "N/A";
		const pincode = event.target.pincode.value;

		const orderSummary = cart
			.map(
				(item) =>
					`${item.name} (₹${item.discountedPrice} x ${item.quantity}) = ₹${
						item.discountedPrice * item.quantity
					}`
			)
			.join("\n");

		const totalPrice = calculateTotalPrice();

		// WhatsApp message template with better formatting
		const message = `*Order Details:*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Address:* ${address}\n*Landmark:* ${landmark}\n*Pincode:* ${pincode}\n\n*Order Summary:*\n${orderSummary}\n\n*Total Price:* ₹${totalPrice}`;

		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://wa.me/919965551361?text=${encodedMessage}`;

		window.open(whatsappUrl, "_blank");

		handleOrderSuccess();
	};

	const handleOrderSuccess = () => {
		cartService.clearCart();
		navigate("/order-confirmation");
	};

	return (
		<div className="checkout-container">
			<h1 className="checkout-title">Checkout</h1>
			<div className="checkout-content">
				<form className="checkout-form" onSubmit={handleSubmit}>
					<div className="input-group">
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Enter your name"
							required
						/>
					</div>

					<div className="input-group">
						<label htmlFor="phone">Phone Number:</label>
						<input
							type="text"
							id="phone"
							name="phone"
							placeholder="Enter your phone number"
							required
						/>
					</div>

					<div className="input-group">
						<label htmlFor="email">Email (Optional):</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email"
						/>
					</div>

					<div className="input-group">
						<label htmlFor="address">Address:</label>
						<textarea
							id="address"
							name="address"
							placeholder="Enter your full address"
							required
						/>
					</div>

					<div className="input-group">
						<label htmlFor="landmark">Landmark:</label>
						<input
							type="text"
							id="landmark"
							name="landmark"
							placeholder="Any landmark near your location"
						/>
					</div>

					<div className="input-group">
						<label htmlFor="pincode">Pincode:</label>
						<input
							type="text"
							id="pincode"
							name="pincode"
							placeholder="Enter your pincode"
							required
						/>
					</div>

					<h2 className="summary-title">Order Summary</h2>
					<ul className="checkout-product-list">
						{cart.map((item) => (
							<li key={item._id}>
								{item.name} - ₹{item.discountedPrice} x {item.quantity} = ₹
								{item.discountedPrice * item.quantity}
							</li>
						))}
					</ul>

					<h3 className="total-price">Total: ₹{calculateTotalPrice()}</h3>

					<button className="checkout-submit-button" type="submit">
						Proceed to Pay
					</button>
				</form>
			</div>
		</div>
	);
};

export default CheckoutPage;
