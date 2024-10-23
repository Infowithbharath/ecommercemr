import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css"; // Add custom styling if needed

const apiUrl = process.env.REACT_APP_BASE_URL;
const API_URL = `${apiUrl}/api/categories`; // Adjust the API URL as needed

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [category, setCategory] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [categories, setCategories] = useState([]); // State for categories

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(API_URL);
				setCategories(response.data || []); // Adjust if your API response structure is different
			} catch (err) {
				setError("Failed to load categories");
			}
		};

		fetchCategories();
	}, []);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleSearchSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await axios.get(`${apiUrl}/api/products/search`, {
				params: {
					q: searchTerm,
					category,
					page: 1, // You can implement pagination as needed
					limit: 10,
				},
			});
			setResults(response.data.products);
		} catch (err) {
			setError("Failed to fetch search results");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="search-container">
			<form onSubmit={handleSearchSubmit} className="search-form">
				<input
					type="text"
					placeholder="Search products..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="search-input"
				/>
				<select
					value={category}
					onChange={handleCategoryChange}
					className="category-select">
					<option value="">All Categories</option>
					{categories.map((cat) => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
				<button type="submit" className="search-button">
					Search
				</button>
			</form>

			{loading && <p>Loading...</p>}
			{error && <p className="error">{error}</p>}

			<div className="search-results">
				{results.length > 0 ? (
					results.map((product) => (
						<div key={product._id} className="product-card">
							<img
								src={product.images[0]}
								alt={product.name}
								className="product-image"
							/>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<p>Price: ${product.discountedPrice}</p>
						</div>
					))
				) : (
					<p>No products found</p>
				)}
			</div>
		</div>
	);
};

export default Search;
