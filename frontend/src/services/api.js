import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080", // <-- Alterado aqui
	withCredentials: true,
});

export const openApi = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080", // <-- Alterado aqui
});

export default api;