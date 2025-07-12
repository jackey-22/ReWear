import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '/logo.png';

export default function PublicHeader() {
	const navigate = useNavigate();

	const navItems = [
		{ label: 'Home', to: '/' },
		{ label: 'Browse Items', to: '/browse' },
		{ label: 'Login', to: '/login' },
		{ label: 'Sign Up', to: '/register' },
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-40 w-full h-20 bg-white/80 backdrop-blur border-b border-gray-200 shadow-md flex items-center justify-between px-6">
			{/* Logo + Title */}
			<div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
				<img src={logo} alt="Logo" className="w-9 h-9 rounded-full object-contain" />
				<span className="text-xl font-bold text-gray-800">ReWear</span>
			</div>

			{/* Navigation Links */}
			<nav className="flex gap-6">
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`text-sm font-medium transition duration-200 ${
								isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
							}`
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
		</header>
	);
}
