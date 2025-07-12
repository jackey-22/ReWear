import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Sidebar({ isVisible, onClose }) {
	const navigate = useNavigate();
	const role = localStorage.getItem('role')?.toLowerCase();

	const roleRoutes = {
		user: [
			{ name: 'Dashboard', route: '/user/dashboard', icon: 'pi pi-home' },
			{ name: 'Browse Items', route: '/user/browse', icon: 'pi pi-images' },
			{ name: 'My Listings', route: '/user/my-listings', icon: 'pi pi-list' },
			{ name: 'Add New Item', route: '/user/add-item', icon: 'pi pi-plus-circle' },
			{ name: 'Swap Requests', route: '/user/swaps', icon: 'pi pi-exchange' },
			{ name: 'Points History', route: '/user/points', icon: 'pi pi-dollar' },
			// { name: 'Notifications', route: '/user/notifications', icon: 'pi pi-bell' },
			{ name: 'Profile', route: '/user/profile', icon: 'pi pi-user' }
		],
		admin: [
			{ name: 'Admin Dashboard', route: '/admin/dashboard', icon: 'pi pi-home' },
			{ name: 'Pending Items', route: '/admin/pending-items', icon: 'pi pi-clock' },
			{ name: 'Users', route: '/admin/users', icon: 'pi pi-users' },
			// { name: 'Swap Logs', route: '/admin/swaps', icon: 'pi pi-inbox' },
			// { name: 'Points Management', route: '/admin/points', icon: 'pi pi-cog' },
			// { name: 'Action Logs', route: '/admin/logs', icon: 'pi pi-file' },
			// { name: 'Notifications', route: '/admin/notifications', icon: 'pi pi-bell' },
			{ name: 'Profile', route: '/admin/profile', icon: 'pi pi-user' }
		]
	};

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	const links = roleRoutes[role] || [];

	return (
		<aside
			className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg 
    w-64 flex-shrink-0 flex flex-col justify-between 
    transition-transform duration-300 ease-in-out 
    fixed top-16 left-0 z-30 h-[calc(100vh-4rem)]
    ${isVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
		>
			<nav className="px-6 py-8 space-y-4 overflow-y-auto flex-1">
				{links.map((link) => (
					<NavLink
						key={link.name}
						to={link.route}
						onClick={onClose}
						className={({ isActive }) =>
							`flex items-center gap-4 px-5 py-3 rounded-xl font-semibold text-lg transition-all ${
								isActive
									? 'bg-blue-600 text-white shadow'
									: 'text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800'
							}`
						}
					>
						<i className={`${link.icon} text-xl`}></i>
						<span>{link.name}</span>
					</NavLink>
				))}
			</nav>

			<div className="px-6 py-6 border-t border-gray-200 dark:border-gray-800">
				<Button
					icon="pi pi-sign-out"
					label="Logout"
					onClick={logout}
					className="w-full p-button-text text-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-all"
				/>
			</div>
		</aside>
	);
}
