import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import Navbar from "../components/common/Navbar.jsx";
import AdminPanel from "../components/admin/AdminPanel.jsx";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="admin-dashboard">
      <Navbar />

      <div className="admin-dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>

          <div className="admin-info">
            <p>
              Welcome,
              <span> {user?.username || "Admin"} </span>
            </p>
          </div>
        </div>

        <div className="dashboard-content">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
}
