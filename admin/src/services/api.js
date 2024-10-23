// src/api.js
import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;
const api = axios.create({
	baseURL: `${apiUrl}/api`, // Update to match the Express server port
});

export default api;
