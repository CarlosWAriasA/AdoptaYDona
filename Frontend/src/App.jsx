import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { PawPrint, BookCopy } from "lucide-react";
import { Route, Routes, Navigate } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";
import AnimalesEdit from "./pages/Animales/AnimalesEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register/Register";
import { useState } from "react";
import Profile from "./pages/login/profile";
import { AuthProvider } from "./utils/AuthContext";
import { useLocalStorage } from "react-use";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginForm from "./components/login/LoginForm";
import PublicacionesList from "./pages/Publicaciones/PublicacionesList";
import PublicacionesEdit from "./pages/Publicaciones/PublicacionesEdit";
import AnimalesDetails from "./pages/Animales/AnimalesDetails";

function App() {
  const [user, setUser] = useLocalStorage("user");
  const [showSidebar, setShowSidebar] = useState(user ? true : false);

  return (
		<main className='App w-screen'>
			<AuthProvider>
				<div className='flex items-start'>
					{showSidebar && (
						<div className='w-1/6'>
							<Sidebar show={showSidebar} setShowSidebar={setShowSidebar}>
								<SidebarItem
									icon={<PawPrint />}
									text={"Animales"}
									link={"/animales"}
								/>
								<SidebarItem
									icon={<BookCopy />}
									text={"Publicaciones"}
									link={"/publicaciones"}
								/>
							</Sidebar>
						</div>
					)}

					<div className='w-5/6' style={{ overflow: "hidden" }}>
						<Routes>
							<Route element={<ProtectedRoute user={user} />}>
								<Route path='/animales' Component={AnimalesList} />
							</Route>
							<Route element={<ProtectedRoute user={user} />}>
								<Route path='/animales-edit' Component={AnimalesEdit} />
							</Route>
							<Route element={<ProtectedRoute user={user} />}>
								<Route path='/animales-detail/:id' Component={AnimalesDetails} />
							</Route>
							<Route path='profile' Component={Profile}></Route>
							<Route
								path='/login'
								Component={() => (
									<LoginForm
										setShowSidebar={setShowSidebar}
										setUser={setUser}
									/>
								)}
							/>
							<Route
								path='/register'
								Component={() => <Register setShowSidebar={setShowSidebar} />}
							/>
							<Route
								path='/publicaciones'
								Component={() => <PublicacionesList />}
							/>
							<Route
								path='/publicaciones-edit'
								Component={() => <PublicacionesEdit />}
							/>
							<Route
								path='/'
								Component={() => (
									<LoginForm
										setShowSidebar={setShowSidebar}
										setUser={setUser}
									></LoginForm>
								)}
							/>
							<Route path='*' element={<Navigate to='/animales' />} />
						</Routes>
					</div>
				</div>
				<ToastContainer />
			</AuthProvider>
		</main>
	)
}

export default App;
