import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken, logout } from "../../services/authService.js";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = getToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Vegitables and Fruits
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {token && <Link to="/admin">Admin</Link>}

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-register">
                Register
              </Link>
            </>
          ) : (
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>

          {token && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
