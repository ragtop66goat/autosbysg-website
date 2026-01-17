import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !isAdmin(user.email)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
