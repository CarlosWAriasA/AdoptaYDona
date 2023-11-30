import { MoreVertical } from "lucide-react";
import { createContext } from "react";
import { Link } from "react-router-dom";


const SidebarContext = createContext()

// eslint-disable-next-line react/prop-types
export default function Sidebar({ children, show }) {
	const sidebarStyle = {
		display: show ? "block" : "none",
	}
	return (
		<aside className='h-screen' style={sidebarStyle}>
			<nav className='h-full flex flex-col bg-gray-800 border-r-2 shadow-sm'>
				<div className='p-4 pb-2 flex justify-between items-center'>
					<Link to={"/"}>
						<img
							src='logo.png'
							className={`overflow-hidden transition-all`}
							alt=''
						/>
					</Link>
				</div>

				<SidebarContext.Provider>
					<ul className='flex-1 px-3'>{children}</ul>
				</SidebarContext.Provider>

				<div className='border-t-2 flex p-3'>
					<img
						src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
						alt=''
						className='w-10 h-10 rounded-md'
					/>
					<div
						className={`
              flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3
          `}
					>
						<div className='leading-4'>
							<h4 className='font-semibold'>Carlos Arias</h4>
						</div>
						<MoreVertical size={20} className='hover:cursor-pointer' />
					</div>
				</div>
			</nav>
		</aside>
	)
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
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
				>
					{text}
				</div>
			</li>
		</Link>
	)
}
