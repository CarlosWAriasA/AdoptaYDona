// import React, { useEffect } from "react"

import { useEffect } from "react"
import LoginForm from "../../components/login/LoginForm"
import { SidebarContext } from "../../components/Sidebar/Sidebar"

export default function login({ setShowSidebar }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		setShowSidebar(false)
	}, [setShowSidebar])

	return (
		<div className='m-auto mr-64'>
			<SidebarContext.Provider value={true}>
				<LoginForm setShowSidebar={setShowSidebar} />
			</SidebarContext.Provider>
		</div>
	)
}
