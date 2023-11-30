import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react"
import { Route, Routes } from "react-router-dom"
import AnimalesList from "./pages/Animales/AnimalesList"
import AnimalesEdit from "./pages/Animales/AnimalesEdit"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Login from "./pages/login/login"
import Register from "./pages/Register/Register"
import { useState } from "react"
import Profile from "./pages/login/profile"
import { AuthProvider } from "./utils/AuthContext"


function App() {
	const [showSidebar, setShowSidebar] = useState(true)
	return (
		<main className='App w-screen'>
			<AuthProvider>
				<div className='flex items-start'>
					<div className='w-1/6'>
						<Sidebar show={showSidebar}>
							<SidebarItem
								icon={<LayoutDashboard />}
								text={"Animales"}
								link={"/animales"}
							/>
						</Sidebar>
					</div>

					<div className='w-5/6'>
						<Routes>
							<Route path='/' Component={() => <div>Home Page</div>} />
							<Route path='/animales' Component={AnimalesList} />
							<Route path='/animales-edit' Component={AnimalesEdit} />
							<Route path='/login' Component={Login} />
							<Route path='/register' Component={Register} />
							<Route path='profile' Component={Profile}></Route>
						</Routes>
					</div>
				</div>
				<ToastContainer />
			</AuthProvider>
		</main>
	)
}

export default App;
