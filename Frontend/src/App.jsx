import "./App.css";
import Sidebar, { SidebarItem } from "./components/Sidebar/Sidebar";
import { LayoutDashboard, Repeat } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import AnimalesList from "./pages/Animales/AnimalesList";
import AnimalesEdit from "./pages/Animales/AnimalesEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';
 
 
function App() {
  return (
 
<body>


  
    
    <main className="App w-screen"  style={{ backgroundImage: "url('rose-petals.png')"}} >
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
            <Route path="/" Component={() =>    <div></div> } />
            <Route path="/animales" Component={AnimalesList} />
            <Route path="/animales-edit" Component={AnimalesEdit} />
              
          </Routes>
                
        </div>
        

      </div>
       
      <ToastContainer />
 
        

    </main>
 
   
    </body>
  );
}

export default App;
