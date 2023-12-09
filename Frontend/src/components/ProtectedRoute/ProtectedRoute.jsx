import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/", ...props }) => {
  if (!user || Object.keys(user).length === 0) {
    console.log(user);
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet {...props} />;
};

export default ProtectedRoute;
