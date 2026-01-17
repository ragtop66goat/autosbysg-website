import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="admin-page">
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="admin-header">
              <h1>Admin Dashboard</h1>
              <div className="admin-user-info">
                <span className="text-muted">Logged in as: {user?.email}</span>
                <button className="btn btn-outline-secondary ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="welcome-card">
              <h3>Welcome to the Admin Panel</h3>
              <p className="text-muted">
                This is a placeholder for the admin dashboard. Future features will include:
              </p>
              <ul>
                <li>Manage vehicle inventory (Add, Edit, Delete)</li>
                <li>Upload vehicle images</li>
                <li>Update pricing and availability status</li>
                <li>View customer inquiries</li>
              </ul>
              <p className="text-muted mt-3">
                <strong>Coming soon!</strong> Full CRUD operations for inventory management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
