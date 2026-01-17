import { useAuth } from "../../context/Auth";
import { useNavigate, Link } from "react-router-dom";
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
                Manage your dealership from this dashboard.
              </p>
              <div className="admin-actions">
                <Link to="/admin/inventory" className="btn btn-primary btn-lg">
                  Manage Inventory
                </Link>
              </div>
              <h4 className="mt-4">Quick Actions</h4>
              <ul>
                <li>View, add, edit, and delete vehicles</li>
                <li>Update pricing and vehicle details</li>
                <li>Manage vehicle images and features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
