import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;
const API_URL = `${apiUrl}/api/subcategories`; // Adjust the API URL as needed

const getSubcategories = async (categoryId) => {
	return await axios.get(`${API_URL}/${categoryId}`);
};

export default { getSubcategories };
