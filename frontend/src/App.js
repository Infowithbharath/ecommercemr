import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import ContactUs from "./components/ContactUs";
import SearchResults from "./components/SearchResults";
import { SubcategoryProvider } from "./components/SubcategoryContext"; // Import the SubcategoryProvider

function App() {
	return (
		<SubcategoryProvider>
			{" "}
			{/* Wrap the app in SubcategoryProvider */}
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route path="/contact" element={<ContactUs />} />{" "}
					{/* Contact Us route */}
					<Route path="/search-results" element={<SearchResults />} />{" "}
					{/* Search Results */}
					<Route path="*" element={<div>Page not found</div>} />{" "}
					{/* Fallback route for 404 */}
				</Routes>
			</Router>
		</SubcategoryProvider>
	);
}

export default App;
