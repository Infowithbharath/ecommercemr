import React, { useEffect, useState } from "react";
import api from "../services/api";
import CategoryForm from "./CategoryForm";
const apiUrl = process.env.REACT_APP_BASE_URL;

const CategoriesList = () => {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await api.get("/categories");
				setCategories(response.data);
			} catch (err) {
				console.error("Error fetching categories:", err);
			}
		};

		fetchCategories();
	}, []);

	const handleEdit = (category) => {
		setSelectedCategory(category); // Pass the category to the form for editing
	};

	const handleCancelEdit = () => {
		setSelectedCategory(null); // Clear the selected category
	};

	// Function to remove a category from the list after deletion
	const handleDeleteCategory = async (categoryId) => {
		try {
			await api.delete(`/categories/${categoryId}`);
			alert("Category deleted successfully");
			// Remove deleted category from UI
			setCategories(
				categories.filter((category) => category._id !== categoryId)
			);
		} catch (err) {
			console.error("Error deleting category:", err);
			alert(
				"Error deleting category: " +
					(err.response?.data?.error || "Something went wrong")
			);
		}
	};

	return (
		<div className="categories-list">
			<h1>Categories</h1>
			<ul>
				{categories.map((category) => (
					<li key={category._id}>
						<h3>{category.name}</h3>
						{category.image && (
							<img
								src={`${apiUrl}/${category.image}`}
								alt={category.name}
								style={{ width: "100px", height: "100px", objectFit: "cover" }}
							/>
						)}
						<div className="category-actions">
							<button onClick={() => handleEdit(category)}>Edit</button>
							<button
								onClick={() => handleDeleteCategory(category._id)}
								className="delete-button">
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>

			{/* Show the form for editing/creating a category */}
			{selectedCategory ? (
				<CategoryForm category={selectedCategory} onCancel={handleCancelEdit} />
			) : (
				<CategoryForm />
			)}
		</div>
	);
};

export default CategoriesList;
