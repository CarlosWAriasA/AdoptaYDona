import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/", ...props }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet {...props} />;
};

export default ProtectedRoute;
