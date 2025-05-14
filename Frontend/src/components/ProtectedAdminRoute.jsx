// src/components/ProtectedAdminRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // Si no está logueado o no es admin, redirige al inicio
  if (!user.isLoggedIn || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
