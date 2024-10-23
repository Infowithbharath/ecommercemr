import React, { useEffect, useState } from "react";
import api from "../services/api"; // Ensure this path is correct
import ProductForm from "./ProductForm"; // Ensure this path is correct
import "./product.css"; // Import the CSS file

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [editingProduct, setEditingProduct] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const res = await api.get("/product");
			setProducts(res.data);
		} catch (err) {
			console.error("Error fetching products:", err);
		}
	};

	const handleEdit = (product) => {
		setEditingProduct(product);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			try {
				await api.delete(`/product/${id}`);
				alert("Product deleted successfully!");
				fetchProducts();
			} catch (err) {
				console.error("Error deleting product:", err);
			}
		}
	};

	const handleUpdate = () => {
		setEditingProduct(null);
		fetchProducts();
	};

	return (
		<div className="categories-list">
			<h1>Product List</h1>
			<ProductForm productToEdit={editingProduct} onUpdate={handleUpdate} />
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Discount</th>
						<th>Quantity</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product._id}>
							<td>{product.name}</td>
							<td>{product.mrpPrice}</td>
							<td>{product.discount}</td>
							<td>{product.quantity}</td>
							<td>
								<button onClick={() => handleEdit(product)}>Edit</button>
								<button
									className="delete-button"
									onClick={() => handleDelete(product._id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductList;
