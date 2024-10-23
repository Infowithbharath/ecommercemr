import React, { useState, useEffect } from "react";
import api from "../services/api";
import SubcategoryForm from "./SubcategoryForm";
import "./subcategories.css"; // Use the new CSS for subcategories

const apiUrl = process.env.REACT_APP_BASE_URL;

const SubcategoriesList = () => {
	const [subcategories, setSubcategories] = useState([]);
	const [selectedSubcategory, setSelectedSubcategory] = useState(null);

	useEffect(() => {
		const fetchSubcategories = async () => {
			try {
				const res = await api.get("/subcategories"); // Fetch all subcategories
				setSubcategories(res.data);
			} catch (error) {
				console.error("Error fetching subcategories:", error);
			}
		};

		fetchSubcategories();
	}, []);

	const handleEdit = (subcategory) => {
		setSelectedSubcategory(subcategory);
	};

	const handleCancelEdit = () => {
		setSelectedSubcategory(null);
	};

	const handleDelete = async (subcategoryId) => {
		if (window.confirm("Are you sure you want to delete this subcategory?")) {
			try {
				const response = await api.delete(
					`${apiUrl}/subcategories/${subcategoryId}`
				);
				console.log(response.data); // Log the response for debugging
				setSubcategories(
					subcategories.filter((sub) => sub._id !== subcategoryId)
				);
				alert("Subcategory deleted successfully");
			} catch (error) {
				console.error(
					"Error deleting subcategory:",
					error.response || error.message
				);
				alert("Failed to delete the subcategory.");
			}
		}
	};

	const handleFormSubmit = (updatedSubcategory) => {
		if (selectedSubcategory) {
			// Update the subcategory in the list
			setSubcategories(
				subcategories.map((sub) =>
					sub._id === updatedSubcategory._id ? updatedSubcategory : sub
				)
			);
		} else {
			// Add new subcategory to the list
			setSubcategories([...subcategories, updatedSubcategory]);
		}
		setSelectedSubcategory(null); // Reset form after submit
	};

	return (
		<div className="subcategories-container">
			<h1>Manage Subcategories</h1>

			{/* Single form for creating or updating a subcategory */}
			<SubcategoryForm
				subcategory={selectedSubcategory}
				onSubmit={handleFormSubmit}
				onCancel={handleCancelEdit}
			/>

			<h2>Subcategory List</h2>
			<ul className="subcategories-list">
				{subcategories.map((sub) => (
					<li key={sub._id} className="subcategory-item">
						<h3>{sub.name}</h3>
						{sub.image && (
							<img
								src={`${apiUrl}/${sub.image}`}
								alt={sub.name}
								className="subcategory-image"
							/>
						)}
						<div className="subcategory-actions">
							<button className="edit-button" onClick={() => handleEdit(sub)}>
								Edit
							</button>
							<button
								className="delete-button"
								onClick={() => handleDelete(sub._id)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>

			{selectedSubcategory && (
				<button className="cancel-button" onClick={handleCancelEdit}>
					Cancel Edit
				</button>
			)}
		</div>
	);
};

export default SubcategoriesList;
