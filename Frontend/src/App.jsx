import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";

function App() {
  return (
    <main className="App">
      <div className="flex items-start">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard />}
            text={"Animales"}
            link={"/animales"}
          />
        </Sidebar>
        <Routes>
          <Route path="/" Component={() => <div>Home Page</div>} />
          <Route path="/animales" Component={AnimalesList} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
