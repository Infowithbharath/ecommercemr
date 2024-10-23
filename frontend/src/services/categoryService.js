import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;
const API_URL = `${apiUrl}/api/categories`; // Adjust the API URL as needed

const getCategories = async () => {
	return await axios.get(API_URL);
};

export default { getCategories };
