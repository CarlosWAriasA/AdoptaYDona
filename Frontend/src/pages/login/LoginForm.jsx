// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from "react"
import { AuthContext } from "./AuthContext"

import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
	const [emailOrUsername, setEmailOrUsername] = useState("")
	const [password, setPassword] = useState("")
	const { login } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = {
			userName: emailOrUsername,
			password: password,
		}

		try {
			const response = await axios.post(
				"https://localhost:7092/api/Usuario/login",
				formData
			)

			const token = response.data.message

			login(token)
			const user = {
				userName: emailOrUsername,
				password: password,
				token: token,
			}
			navigate("/profile")
			window.localStorage.setItem("loggedNoteUser", JSON.stringify(user))
		} catch (error) {
			console.error(error.response.data)
		}
	}

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			login(user.token)
			navigate("/profile")
		}
	}, [])

	return (
		<form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
			<div className='mb-4'>
				<label
					htmlFor='userName'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Email o Usuario
				</label>
				<input
					type='text'
					id='userName'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={emailOrUsername}
					onChange={(e) => setEmailOrUsername(e.target.value)}
					required
				/>
			</div>
			<div className='mb-6'>
				<label
					htmlFor='password'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Contraseña
				</label>
				<input
					type='password'
					id='password'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<button
				type='submit'
				className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
			>
				Iniciar sesión
			</button>
		</form>
	)
}
