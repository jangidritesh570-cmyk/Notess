import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading...</h2>;

  return user ? children : <Navigate to="/login" />;
}