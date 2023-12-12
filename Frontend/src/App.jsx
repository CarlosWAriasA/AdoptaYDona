import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";
import AnimalesEdit from "./pages/Animales/AnimalesEdit";
import ChatPage from "./pages/Chat/ChatPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/login";
import Register from "./pages/Register/Register";
import { useEffect, useState, useContext } from "react";
import Profile from "./pages/login/profile";
import { AuthProvider } from "./utils/AuthContext";
import { useLocalStorage } from "react-use";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useNavigate } from "react-router-dom";

function App() {
	const [showSidebar, setShowSidebar] = useState(false);
	const [user, setUser] = useLocalStorage("user");
	const navigate = useNavigate();
  
	useEffect(() => {
	  const timeOut = setInterval(() => {
		const loggedUserJSON = window.localStorage.getItem("user");
		if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON);
		  setUser(user);
		  setShowSidebar(true);
		  navigate("/animales");
		  clearInterval(timeOut);
		}
	  }, 100);
  
	  return () => {
		clearInterval(timeOut);
	  };
	}, []);
  
	return (
	  <main className='App w-screen'>
		<AuthProvider>
		  <div className='flex items-start'>
			{showSidebar && (
			  <div className='w-1/6'>
				<Sidebar show={showSidebar}>
				  <SidebarItem
					icon={<LayoutDashboard />}
					text={"Animales"}
					link={"/animales"}
				  />
				  {/* Agrega el ítem de Mensajería */}
				  <SidebarItem
					icon={<MessagesSquare />} // Agrega el ícono correspondiente
					text={"Mensajería"}
					link={"/mensajeria"} // Ajusta la ruta según tu estructura
				  />
				  {/* Otros ítems de la barra lateral */}
				</Sidebar>
			  </div>
			)}
  
			<div className='w-5/6' style={{ overflow: 'hidden' }}>
			  <Routes>
				{/* Otras rutas */}
				<Route
				  path='/login'
				  element={<Login setShowSidebar={setShowSidebar} setUser={setUser} />}
				/>
				<Route
				  path='/register'
				  element={<Register setShowSidebar={setShowSidebar} />}
				/>
				<>
				  <Route element={<ProtectedRoute user={user} />}>
					<Route path='/animales' element={<AnimalesList />} />
				  </Route>
				  <Route element={<ProtectedRoute user={user} />}>
					<Route path='/animales-edit' element={<AnimalesEdit />} />
				  </Route>
				  <Route path='/profile' element={<Profile />} />
				</>
				<Route path='/' element={<Login />} />
				{/* Agrega la ruta para Mensajería */}
				<Route path='/mensajeria' element={<ChatPage />} />
			  </Routes>
			</div>
		  </div>
		  <ToastContainer />
		</AuthProvider>
	  </main>
	);
  }
  
  export default App;