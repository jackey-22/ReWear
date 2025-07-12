import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import logo from '/logo.png';

export default function Header({ onToggleSidebar }) {
	const navigate = useNavigate();

	return (
		<header className="fixed top-0 left-0 right-0 z-40 w-full h-20 backdrop-blur-lg bg-white/60border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-4 md:px-6 shadow-md">
			{/* Left: Brand and Menu Toggle */}
			<div className="flex items-center gap-4">
				<button
					onClick={onToggleSidebar}
					className="md:hidden text-2xl text-gray-700  hover:text-blue-500 transition duration-200"
					aria-label="Toggle sidebar"
				>
					☰
				</button>
				{/* Logo and Title */}
				<div className="flex items-center gap-2">
					<img src={logo} alt="Logo" className="w-8 h-8 rounded-full object-contain" />
					<h1 className="text-2xl font-bold tracking-tight text-gray-800 ">
						SkillStream LMS
					</h1>
				</div>
			</div>

			{/* Right: User Info */}
			<div
				className="flex items-center bg-white/80 border border-gray-300 px-4 py-2 rounded-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
				onClick={() => navigate('/profile')}
			>
				<Avatar
					icon="pi pi-user"
					shape="circle"
					className="bg-blue-100 text-blue-700"
				/>
			</div>
		</header>
	);
}
