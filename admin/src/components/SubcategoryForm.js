import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./subcategories.css"; // Styling file for the form

const SubcategoryForm = ({ subcategory, onSubmit, onCancel }) => {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState(null);
	const [currentImage, setCurrentImage] = useState("");
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	const isEditMode = !!subcategory;

	useEffect(() => {
		fetchCategories();
		if (subcategory) {
			setName(subcategory.name);
			setCategory(subcategory.category._id || subcategory.category);
			setCurrentImage(subcategory.image);
			setImage(null); // Clear image selection
		} else {
			setName("");
			setCategory("");
			setCurrentImage("");
		}
	}, [subcategory]);

	const fetchCategories = async () => {
		try {
			const res = await api.get("/categories");
			setCategories(res.data);
		} catch (err) {
			console.error("Error fetching categories:", err);
		}
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !category) {
			alert("Please fill out all required fields.");
			return;
		}

		setLoading(true);
		const formData = new FormData();
		formData.append("name", name);
		formData.append("category", category);
		if (image) formData.append("image", image);

		try {
			if (isEditMode) {
				const response = await api.put(
					`/subcategories/${subcategory._id}`,
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
					}
				);
				alert("Subcategory updated successfully");
				onSubmit(response.data);
			} else {
				const response = await api.post("/subcategories", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				alert("Subcategory created successfully");
				onSubmit(response.data);
			}
			setLoading(false);
		} catch (err) {
			console.error("Error submitting subcategory:", err);
			alert("Failed to submit the subcategory.");
			setLoading(false);
		}
	};

	return (
		<form className="subcategory-form" onSubmit={handleSubmit}>
			<label>
				Category:
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required>
					<option value="">Select Category</option>
					{categories.map((cat) => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</select>
			</label>

			<label>
				Subcategory Name:
				<input
					type="text"
					placeholder="Subcategory Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</label>

			<label>
				{isEditMode && currentImage && (
					<div className="current-image">
						Current Image: <em>{currentImage.split("/").pop()}</em>
					</div>
				)}
				<input type="file" onChange={handleImageChange} />
			</label>

			<button type="submit" className="submit-button" disabled={loading}>
				{loading ? "Submitting..." : isEditMode ? "Update" : "Create"}{" "}
				Subcategory
			</button>

			{isEditMode && (
				<button
					type="button"
					onClick={onCancel}
					className="cancel-button"
					disabled={loading}>
					Cancel
				</button>
			)}
		</form>
	);
};

export default SubcategoryForm;
