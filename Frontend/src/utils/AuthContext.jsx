// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from "react"

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null)

	const login = (newToken) => {
		setToken(newToken)
	}

	const logout = () => {
		setToken(null)
	}

	return (
		<AuthContext.Provider value={{ token, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
