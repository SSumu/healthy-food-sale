import { useState } from "react";
import "./LoginForm.css";

export default function LoginForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-title">Vegetables & Fruits Sale System</h1>
      <p className="login-form-subtitle">Admin Login</p>

      {error && <div className="login-form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-form-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
