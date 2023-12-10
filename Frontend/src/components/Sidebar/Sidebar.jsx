import { MoreVertical, LogOut } from "lucide-react";
import { createContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

export const SidebarContext = createContext();

// eslint-disable-next-line react/prop-types
export default function Sidebar({ show, setShowSidebar, children }) {
  const menuRef = useRef(null);
  const [user, setUser] = useLocalStorage("user");
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  const handleMoreVerticalClick = () => {
    setMostrarMenu((prev) => !prev);
  };

  const handleCerrarSesionClick = () => {
    setShowSidebar(false);
    setUser({});
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMostrarMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <aside className="h-screen">
      {show && (
        <nav className="h-full flex flex-col bg-gray-800 border-r-2 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center border-b-2 ">
            <Link to={"/animales"}>
              <img
                src="logo.png"
                className={`overflow-hidden transition-all h-36 w-screen`}
                alt=""
              />
            </Link>
          </div>

          <SidebarContext.Provider value={true}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t-2 flex p-3">
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user?.fullName}</h4>
              </div>
              <div ref={menuRef}>
                <MoreVertical
                  size={20}
                  className="hover:cursor-pointer hover:bg-slate-500 rounded-lg"
                  onClick={handleMoreVerticalClick}
                />
                {mostrarMenu && (
                  <div className="absolute bottom-10 ">
                    <div
                      className="flex items-center gap-2 p-2 cursor-pointer rounded-lg bg-gray-600 hover:bg-gray-500"
                      onClick={handleCerrarSesionClick}
                    >
                      <LogOut
                        size={20}
                        className="hover:cursor-pointer text-red-800"
                        onClick={handleMoreVerticalClick}
                      />
                      <span className="font-bold">Cerrar sesión</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </aside>
  );
}

// eslint-disable-next-line react/prop-types
export function SidebarItem({ icon, text, active, alert, link }) {
  return (
    <Link to={link}>
      <li
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-emerald-900 text-white-600"
        }
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all text-white w-52 ml-3 text-lg
          `}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 top-2`}
          />
        )}
        <div
          className={`
          absolute left-full rounded-md px-2 py-1
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-40
      `}
        >
          {text}
        </div>
      </li>
    </Link>
  );
}
