import API from "./api.js";
import { getToken } from "./authService.js";

export const getProducts = (keyword = "") =>
  API.get(`/products?keyword=${keyword}`);

export const createProduct = (data) =>
  API.post("/products", data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
