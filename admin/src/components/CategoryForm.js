import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./category.css";

const CategoryForm = ({ category, onCancel }) => {
	const [name, setName] = useState("");
	const [image, setImage] = useState(null);
	const isEditMode = !!category; // Check if we are editing or creating

	useEffect(() => {
		if (category) {
			setName(category.name);
			setImage(null); // Clear any previously selected image
		} else {
			setName(""); // Reset form for new category creation
		}
	}, [category]);

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		if (image) formData.append("image", image);

		try {
			if (isEditMode) {
				// Update the category
				await api.put(`/categories/${category._id}`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				alert("Category updated successfully");
			} else {
				// Create a new category
				await api.post("/categories", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				alert("Category created successfully");
			}
			if (onCancel) onCancel(); // Reset form after success
		} catch (err) {
			console.error("Error:", err);
			alert("Error: " + (err.response?.data?.error || "Something went wrong"));
		}
	};

	const handleDelete = async () => {
		if (!category) return;
		try {
			await api.delete(`/categories/${category._id}`);
			alert("Category deleted successfully");
			if (onCancel) onCancel(); // Clear form after deletion
		} catch (err) {
			console.error("Error deleting category:", err);
			alert(
				"Error deleting category: " +
					(err.response?.data?.error || "Something went wrong")
			);
		}
	};

	return (
		<form className="category-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Category Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				className="input-field"
			/>
			<input type="file" onChange={handleImageChange} className="file-input" />
			<button className="submit-button" type="submit">
				{isEditMode ? "Update" : "Create"} Category
			</button>
			{isEditMode && (
				<>
					<button
						className="delete-button"
						type="button"
						onClick={handleDelete}>
						Delete Category
					</button>
					<button type="button" onClick={onCancel} className="cancel-button">
						Cancel Edit
					</button>
				</>
			)}
		</form>
	);
};

export default CategoryForm;
