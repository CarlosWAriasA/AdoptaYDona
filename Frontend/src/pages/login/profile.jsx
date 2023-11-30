// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import axios from "axios"
import LogoutButton from "./LoggoutButtom"

export default function Profile() {
	const { token } = useContext(AuthContext)
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://localhost:7092/api/Usuario/GetUserRole",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setData(response.data)
		} catch (error) {
			setErrorMessage("An error occurred while fetching data.")
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<LogoutButton></LogoutButton>
			{errorMessage || isLoading ? (
				<p>{errorMessage || "Loading..."}</p>
			) : (
				<ul>
					{data.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}
		</div>
	)
}
