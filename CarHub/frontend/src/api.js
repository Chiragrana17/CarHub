import axios from "axios";

const API_URL = "http://localhost:5006/api";

// Authentication
export const login = async(email, password) => {
    return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const signup = async(username, email, password) => {
    return axios.post(`${API_URL}/auth/signup`, { username, email, password });
};

// Products (instead of Cars)
export const createProduct = async(productData, token) => {
    return axios.post(`${API_URL}/products`, productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const listProducts = async(token) => {
    return axios.get(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteProduct = async(id, token) => {
    return axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getProductDetails = async(id, token) => {
    return axios.get(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateProduct = async(id, productData, token) => {
    return axios.put(`${API_URL}/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};