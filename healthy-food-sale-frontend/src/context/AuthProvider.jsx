import { useCallback, useEffect, useMemo, useState } from "react";
import { login as loginService, getToken } from "../services/authService.js";
import API from "../services/api.js";
import { AuthContext } from "./AuthContext.js";
import "./AuthProvider.css";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  // Fetch current or logged user profile
  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.error("Profile fetch failed:", error);
      logout();
    } finally {
      setloading(false);
    }
  }, [logout]);

  // Check token when app loads | Load profile on app start
  useEffect(() => {
    const token = getToken();

    const loadProfile = async () => {
      if (token) {
        await fetchProfile();
      } else {
        setloading(false);
      }
    };

    loadProfile();
  }, [fetchProfile]);

  // Login function
  const login = useCallback(async (formData) => {
    try {
      await loginService(formData);

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setUser(res.data);

      return {
        success: true,
      };
    } catch (error) {
      console.error("Login failed:", error);

      return {
        success: false,
        message: error.response?.data?.message || "Invalid email or password",
      };
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      <div className="auth-wrapper">
        {loading ? (
          <div className="auth-loader-container">
            <div className="auth-loader"></div>
            <p>Loading...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </AuthContext.Provider>
  );
}
