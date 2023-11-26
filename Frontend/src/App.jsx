import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";
import AnimalesEdit from "./pages/Animales/AnimalesEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="App w-screen">
      <div className="flex items-start">
        <div className="w-1/6">
          <Sidebar>
            <SidebarItem
              icon={<LayoutDashboard />}
              text={"Animales"}
              link={"/animales"}
            />
          </Sidebar>
        </div>
        <div className="w-5/6">
          <Routes>
            <Route path="/" Component={() => <div>Home Page</div>} />
            <Route path="/animales" Component={AnimalesList} />
            <Route path="/animales-edit" Component={AnimalesEdit} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default App;
