import { Navigate } from "react-router-dom";
import { useAuth } from "../Store/useAuth";

function PublicRoute({ children }) {
  const { isLogin, loading } = useAuth();

  if (loading) return <div>Loading...</div>; 

  return isLogin ? <Navigate to="/dashboard" /> : children;
}

export default PublicRoute;