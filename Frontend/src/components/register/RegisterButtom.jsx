// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Registerbuttom() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <button
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 hover:border-green-600 mt-5 "
        onClick={handleRegister}
      >
        Crear Cuenta
      </button>
    </div>
  );
}
