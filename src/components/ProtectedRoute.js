import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin(user.email)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
