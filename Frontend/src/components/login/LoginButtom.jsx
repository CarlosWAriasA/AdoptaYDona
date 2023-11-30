// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react"

import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
	const navigate = useNavigate()

	const handleLogin = () => {
		navigate("/login")
	}

	return <button onClick={handleLogin}>iniciar Sesion</button>
}
