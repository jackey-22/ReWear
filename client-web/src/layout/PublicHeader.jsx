import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import logo from '/logo.png';

export default function PublicHeader() {
	const navigate = useNavigate();

	const navItems = [
		{ label: 'Home', to: '/' },
		{ label: 'Browse Items', to: '/products' },
		{ label: 'Login', to: '/login' },
		{ label: 'Sign Up', to: '/register' },
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md flex items-center justify-between px-6">
			{/* Logo + Title */}
			<div
				className="flex items-center gap-3 cursor-pointer"
				onClick={() => navigate('/')}
			>
				<Avatar image={logo} shape="circle" size="large" />
				<h1 className="text-xl font-bold text-gray-800 tracking-tight">ReWear</h1>
			</div>

			{/* Top-right Navigation */}
			<nav className="flex gap-6 items-center">
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`text-sm font-medium transition-colors duration-200 ${
								isActive
									? 'text-blue-600 underline underline-offset-4'
									: 'text-gray-700 hover:text-blue-500'
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
