import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";
import AnimalesEdit from "./pages/Animales/AnimalesEdit";
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
    <main className="App w-screen">
      <AuthProvider>
        <div className="flex items-start">
          {showSidebar && (
            <div className="w-1/6">
              <Sidebar show={showSidebar}>
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
              <Route
                path="/login"
                Component={() => (
                  <Login setShowSidebar={setShowSidebar} setUser={setUser} />
                )}
              />
              <Route
                path="/register"
                Component={() => <Register setShowSidebar={setShowSidebar} />}
              />
              <>
                <Route element={<ProtectedRoute user={user} />}>
                  <Route path="/animales" Component={AnimalesList} />
                </Route>
                <Route element={<ProtectedRoute user={user} />}>
                  <Route path="/animales-edit" Component={AnimalesEdit} />
                </Route>
                <Route path="profile" Component={Profile}></Route>
              </>
              <Route path="/" Component={() => <Login></Login>} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </AuthProvider>
    </main>
  );
}

export default App;
