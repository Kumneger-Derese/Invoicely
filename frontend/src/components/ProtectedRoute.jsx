import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { userInfo } = useAuth()

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
