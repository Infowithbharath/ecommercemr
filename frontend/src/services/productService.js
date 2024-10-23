import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;
const BASE_URL = `${apiUrl}/api`;
const ENDPOINTS = {
	PRODUCTS: `${BASE_URL}/product`,
	PRODUCT_TYPES: `${BASE_URL}/productTypes`,
	SEARCH: `${BASE_URL}/product/search`,
	CATEGORY_PRODUCTS: `${BASE_URL}/category`, // For fetching products by category or type
};

// Function to get all products
export const getProducts = async () => {
	try {
		const response = await axios.get(ENDPOINTS.PRODUCTS);
		return response.data;
	} catch (error) {
		console.error(
			`Error fetching all products: ${
				error.response?.data?.message || error.message
			}`
		);
		throw error;
	}
};

// Function to search for products by keyword
export const searchProducts = async (query) => {
	try {
		const response = await axios.get(ENDPOINTS.SEARCH, {
			params: { q: query },
		});
		return response.data; // Returns products matching the search query
	} catch (error) {
		console.error(
			`Error searching for products: ${
				error.response?.data?.message || error.message
			}`
		);
		throw error;
	}
};

// Function to get all product types
export const getProductTypes = async () => {
	try {
		const response = await axios.get(ENDPOINTS.PRODUCT_TYPES);
		return response.data;
	} catch (error) {
		console.error(
			`Error fetching product types: ${
				error.response?.data?.message || error.message
			}`
		);
		throw error;
	}
};

// Function to get product types by subcategory
export const getProductTypesBySubcategory = async (subcategoryId) => {
	try {
		const response = await axios.get(
			`${apiUrl}/api/producttypes/${subcategoryId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching product types:", error);
		throw error; // Re-throw or handle the error as needed
	}
};

// Function to get all product types
export const getAllProductTypes = async () => {
	try {
		const response = await axios.get(`${apiUrl}/api/producttypes`);
		return response.data; // Returns all product types
	} catch (error) {
		console.error(
			`Error fetching all product types: ${
				error.response?.data?.message || error.message
			}`
		);
		throw error;
	}
};

// Function to fetch products by type (subcategory ID)
export const getProductsByType = async (typeId) => {
	try {
		const response = await axios.get(
			`${ENDPOINTS.CATEGORY_PRODUCTS}/${typeId}/products`
		);
		return response.data; // Returns products filtered by the given typeId
	} catch (error) {
		console.error(
			`Error fetching products for type ID ${typeId}: ${
				error.response?.data?.message || error.message
			}`
		);
		throw error;
	}
};

// Function to fetch product details by ID
export const getProductById = async (productId) => {
	try {
		const response = await axios.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
		return response.data;
	} catch (error) {
		console.error(
			`Error fetching product details: ${
				error.response?.data?.message || error.message
			}`
		);
		throw error;
	}
};

const getProductsByProductType = (productTypeId) => {
	return axios.get(`${apiUrl}/api/products/by-product-type/${productTypeId}`);
};

// Centralized export for the product service module
const productService = {
	getProducts,
	searchProducts,
	getProductTypes,
	getProductsByType,
	getProductById,
	getProductsByProductType,
	getProductTypesBySubcategory, // Newly added function for fetching product types by subcategory
	getAllProductTypes,
	// Newly added function for fetching all product types
};

export default productService;
