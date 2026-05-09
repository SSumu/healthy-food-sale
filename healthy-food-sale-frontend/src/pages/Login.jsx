import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import LoginForm from "../components/auth/LoginForm.jsx";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      setError("");

      await login(formData);

      navigate("/admin");
    } catch (error) {
      setError(error?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />

      <p className="register-link">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
