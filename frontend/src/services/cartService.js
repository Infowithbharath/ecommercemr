const cartService = {
	// Retrieve the cart from localStorage
	getCart: () => {
		try {
			const cart = JSON.parse(localStorage.getItem("cart"));
			return cart ? cart : [];
		} catch (err) {
			console.error("Error retrieving cart from localStorage", err);
			return [];
		}
	},

	// Add a product to the cart (or update its quantity if already present)
	addToCart: (product) => {
		const cart = cartService.getCart();
		const existingProduct = cart.find(
			(item) => item.productId === product.productId
		);

		if (existingProduct) {
			existingProduct.quantity += product.quantity;
		} else {
			cart.push(product);
		}

		try {
			localStorage.setItem("cart", JSON.stringify(cart));
			return true;
		} catch (err) {
			console.error("Error saving cart to localStorage", err);
			return false;
		}
	},

	// Update the quantity of a specific product in the cart
	updateCart: (productId, quantity) => {
		const cart = cartService.getCart();
		const updatedCart = cart.map((item) =>
			item.productId === productId ? { ...item, quantity } : item
		);

		try {
			localStorage.setItem("cart", JSON.stringify(updatedCart));
		} catch (err) {
			console.error("Error updating cart in localStorage", err);
		}
	},

	// Remove a product from the cart by its ID
	removeFromCart: (productId) => {
		const cart = cartService.getCart();
		const updatedCart = cart.filter((item) => item.productId !== productId);

		try {
			localStorage.setItem("cart", JSON.stringify(updatedCart));
		} catch (err) {
			console.error("Error removing item from cart in localStorage", err);
		}
	},

	// Clear all items from the cart
	clearCart: () => {
		try {
			localStorage.removeItem("cart");
		} catch (err) {
			console.error("Error clearing cart from localStorage", err);
		}
	},
};

export default cartService;
