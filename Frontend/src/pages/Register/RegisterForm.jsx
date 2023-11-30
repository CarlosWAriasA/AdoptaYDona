import axios from "axios"
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"

const RegistrationForm = () => {
	const [userName, setUserName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [dni, setDni] = useState("")
	const [gender, setGender] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		const formData = {
			email: email,
			userName: userName,
			password: password,
			firstName: firstName,
			lastName: lastName,
			dni: dni,
			gender: gender,
		}

		const jsonData = JSON.stringify(formData)

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}

		axios
			.post("https://localhost:7092/api/Usuario/register", jsonData, config)
			.then((response) => {
				console.log(response.data)
			})
			.catch((error) => {
				console.error(error.response.data)
			})
		console.log(formData)

		setUserName("")
		setFirstName("")
		setLastName("")
		setEmail("")
		setPassword("")
		setDni("")
		setGender("")
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
			<div className='mb-4'>
				<label
					htmlFor='userName'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Usuario
				</label>
				<input
					type='text'
					id='userName'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='firstName'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Nombre
				</label>
				<input
					type='text'
					id='firstName'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='lastName'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Apellido
				</label>
				<input
					type='text'
					id='lastName'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='email'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className='mb-4'>
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
			<div className='mb-4'>
				<label
					htmlFor='dni'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					DNI
				</label>
				<input
					type='text'
					id='dni'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={dni}
					onChange={(e) => setDni(e.target.value)}
					required
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='gender'
					className='block mb-2 text-sm font-medium text-gray-700'
				>
					Género
				</label>
				<select
					id='gender'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
					value={gender}
					onChange={(e) => setGender(e.target.value)}
					required
				>
					<option value=''>Seleccionar</option>
					<option value='masculino'>Masculino</option>
					<option value='femenino'>Femenino</option>
					<option value='otro'>Otro</option>
				</select>
			</div>
			<button
				type='submit'
				className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
			>
				Registrarse
			</button>
		</form>
	)
}

export default RegistrationForm
