import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../utils/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Registerbuttom from "../register/RegisterButtom";
import { BASE_URL } from "../../utils/constant";
import "./login.css";
import ToastHelper from "../../utils/toast.helper";

export default function LoginForm({ setShowSidebar = () => {}, setUser }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName: emailOrUsername,
      password: password,
    };

    try {
      const response = await axios.post(`${BASE_URL}/Usuario/login`, formData);
      const token = response.data.message;
      const userId = response.data.userId;
      const fullName = response.data.fullName;
      login(token);
      const userData = {
        userId: userId,
        token: token,
        userName: emailOrUsername,
        fullName: fullName,
      };

      setUser(userData);
      setShowSidebar(true);
      navigate("/animales");
    } catch (error) {
      ToastHelper.errorToast(error.response?.data);
      console.error(error);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON && Object.keys(JSON.parse(loggedUserJSON)).length > 0) {
      const user = JSON.parse(loggedUserJSON);
      login(user.token);
      setShowSidebar(true);
      navigate("/animales");
    } else {
      setShowSidebar(false);
    }
  }, []);

  return (
    <div className="w-screen mt-28">
      <div className="max-w-sm mx-auto p-6 shadow-lg bg-white rounded-lg">
        <form onSubmit={handleSubmit}>
          <img src="logo.png" alt="logo" className="h-28 mx-auto " />
          <div className="mb-4 border-t-4 pt-2">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-black"
            >
              Usuario
            </label>
            <input
              type="text"
              id="userName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className=" w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Iniciar sesión
          </button>
        </form>
        <Registerbuttom></Registerbuttom>
      </div>
    </div>
  );
}
