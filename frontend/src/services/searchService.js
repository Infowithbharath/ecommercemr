import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;
const searchProducts = (query) => {
	return axios.get(`${apiUrl}/api/products/search`, {
		params: { q: query },
	});
};

const searchService = {
	searchProducts,
};

export default searchService;
