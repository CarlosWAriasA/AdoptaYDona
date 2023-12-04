import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";

// eslint-disable-next-line react/prop-types
const RegistrationForm = ({ setShowSidebar }) => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const styleInput =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dni: dni,
      gender: gender,
    };

    const jsonData = JSON.stringify(formData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(`${BASE_URL}/Usuario/register`, jsonData, config);
      setShowSidebar(true);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
    setUserName("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setDni("");
    setGender("");
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="max-w-sm border p-6 rounded-lg bg-white mx-auto mt-6">
        <form onSubmit={handleSubmit}>
          <img src="logo.png" alt="logo" className="h-28 mx-auto " />
          <div className="flex gap-5 border-t-4 pt-2">
            <div className="mb-4 ">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-black"
              >
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                className={styleInput}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium  text-black"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                className={styleInput}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block mb-2 text-sm font-medium text-black"
              >
                Usuario
              </label>
              <input
                type="text"
                id="userName"
                className={styleInput}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styleInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium  text-black"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className={styleInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dni"
              className="block mb-2 text-sm font-medium text-black"
            >
              DNI
            </label>
            <input
              type="text"
              id="dni"
              className={styleInput}
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-black"
            >
              Género
            </label>
            <select
              id="gender"
              className={styleInput}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Registrarse
          </button>
        </form>
        <button
          className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 hover:border-green-600 mt-5"
          onClick={() => navigate("/login")}
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
