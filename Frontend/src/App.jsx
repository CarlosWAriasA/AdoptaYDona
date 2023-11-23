import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard } from "lucide-react";

function App() {
  return (
    <main className="App">
      <div className="flex items-start">
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard />} text={"Animales"} />
        </Sidebar>
      </div>
    </main>
  );
}

export default App;
