import API from "./api.js";

// Login user
export const login = async (data) => {
  const res = await API.post("/auth/login", data);

  localStorage.setItem("token", res.data.token);

  return res.data;
};

// Get token
export const getToken = () => localStorage.getItem("token");

// Logout user
export const logout = () => localStorage.removeItem("token");
