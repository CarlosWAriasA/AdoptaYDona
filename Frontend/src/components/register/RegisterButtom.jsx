// eslint-disable-next-line no-unused-vars
import React from "react"
import { useNavigate } from "react-router-dom"

export default function Registerbuttom() {
	const navigate = useNavigate()

	const handleRegister = () => {
		navigate("/register")
	}
	return (
		<div>
			<button
				className='w-full px-4 mt-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
				onClick={handleRegister}
			>
				Crear Cuenta
			</button>
		</div>
	)
}
