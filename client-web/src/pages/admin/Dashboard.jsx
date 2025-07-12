import React, { useEffect, useState } from 'react';
import DashboardCard from '../../components/dashboard/CountCards';
import PageLayout from '../../layout/PageLayout';
import { fetchGet } from '../../utils/fetch.utils'; // adjust path

function Dashboard() {
	const [cardData, setCardData] = useState([]);

	useEffect(() => {
		const fetchStats = async () => {
			const res = await fetchGet({ pathName: 'admin/' });

			if (res?.success) {
				const stats = res.data;

				const formattedData = [
					{
						label: 'Total Users',
						value: stats.totalUsers,
						icon: 'pi-users',
						color: 'text-blue-500',
						gradientFrom: '#bfdbfe',
						gradientTo: '#60a5fa',
					},
					{
						label: 'Items Listed',
						value: stats.itemsListed,
						icon: 'pi-tag',
						color: 'text-green-500',
						gradientFrom: '#bbf7d0',
						gradientTo: '#4ade80',
					},
					{
						label: 'Total Accepted',
						value: stats.totalAccepted,
						icon: 'pi-refresh',
						color: 'text-purple-500',
						gradientFrom: '#ddd6fe',
						gradientTo: '#a78bfa',
					},
					{
						label: 'Total Rejected',
						value: stats.totalRejected,
						icon: 'pi-star',
						color: 'text-yellow-500',
						gradientFrom: '#fef9c3',
						gradientTo: '#facc15',
					},
				];

				setCardData(formattedData);
			} else {
				console.error('Dashboard fetch failed:', res.message);
			}
		};

		fetchStats();
	}, []);

	return (
		<PageLayout>
			<div className="min-h-screen bg-white p-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
				<DashboardCard data={cardData} />
			</div>
		</PageLayout>
	);
}

export default Dashboard;
