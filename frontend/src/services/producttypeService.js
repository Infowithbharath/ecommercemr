import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

const getProductTypes = (subcategoryId) => {
	return axios.get(`${apiUrl}/api/product-types/${subcategoryId}`);
};

export default {
	getProductTypes,
};
