// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
