import API from "./api.js";

// Login user
export const login = async (data) => {
  try {
    const res = await API.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);

    // Store user if backend sends it
    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }

    return res.data;
  } catch (error) {
    throw error?.response?.data || { message: "Login failed" };
  }
};

// Register user
export const register = async (data) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw error?.response?.data || { message: "Registration failed" };
  }
};

// Get token
export const getToken = () => localStorage.getItem("token");

// Get logged-in user
export const getUser = () => JSON.parse(localStorage.getItem("user"));

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
