import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";
import AnimalesEdit from "./pages/Animales/AnimalesEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/login";
import Register from "./pages/Register/Register";
import { useEffect, useState } from "react";
import Profile from "./pages/login/profile";
import { AuthProvider } from "./utils/AuthContext";
import { useLocalStorage } from "react-use";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";

function App() {
  const [user, setUser] = useLocalStorage("user");
  const [showSidebar, setShowSidebar] = useState(user ? true : false);

  return (
    <main className="App w-screen">
      <AuthProvider>
        <div className="flex items-start">
          {showSidebar && (
            <div className="w-1/6">
              <Sidebar show={showSidebar} setShowSidebar={setShowSidebar}>
                <SidebarItem
                  icon={<LayoutDashboard />}
                  text={"Animales"}
                  link={"/animales"}
                />
              </Sidebar>
            </div>
          )}

          <div className="w-5/6" style={{ overflow: "hidden" }}>
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/animales" Component={AnimalesList} />
              </Route>
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/animales-edit" Component={AnimalesEdit} />
              </Route>
              <Route path="profile" Component={Profile}></Route>
              <Route
                path="/login"
                Component={() => (
                  <LoginForm
                    setShowSidebar={setShowSidebar}
                    setUser={setUser}
                  />
                )}
              />
              <Route
                path="/register"
                Component={() => <Register setShowSidebar={setShowSidebar} />}
              />
              <Route
                path="/"
                Component={() => (
                  <LoginForm
                    setShowSidebar={setShowSidebar}
                    setUser={setUser}
                  ></LoginForm>
                )}
              />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </AuthProvider>
    </main>
  );
}

export default App;
