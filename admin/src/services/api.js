// src/api.js
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api", // Update to match the Express server port
});

export default api;
