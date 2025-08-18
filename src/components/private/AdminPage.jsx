import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export function AdminPage({ children }) {
  const { user } = useAuth();
  
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}
