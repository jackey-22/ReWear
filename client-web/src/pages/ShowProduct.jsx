import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from './../utils/fetch.utils';
import PageLayout from '../layout/PageLayout';
import { ProgressSpinner } from 'primereact/progressspinner';
import PublicHeader from '../layout/publicHeader'; // ✅ import the public header

const ClothingListPage = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const navigate = useNavigate();

	const categories = ['All', 'Men', 'Women', 'Kids'];

	useEffect(() => {
		fetchGet({ pathName: 'browse-items/' }).then((res) => {
			if (res?.data) setItems(res.data);
			setLoading(false);
		});
	}, []);

	const filteredItems =
		selectedCategory === 'All'
			? items
			: items.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());

	return (
		<>
			<PublicHeader /> {/* ✅ header appears above everything */}

			<main className="pt-24 px-4 md:px-8"> {/* add top padding so content isn't hidden behind fixed header */}
				<PageLayout>
					<div className="p-6 bg-white shadow-md rounded-md">
						<h1 className="text-xl md:text-2xl font-bold text-gray-800">Available Clothes</h1>
						<p className="text-gray-500 text-sm mb-5">Click on any item to view details or redeem</p>

						{/* Category filter buttons */}
						<div className="flex flex-wrap gap-3 mb-6 justify-center">
							{categories.map((cat) => (
								<button
									key={cat}
									onClick={() => setSelectedCategory(cat)}
									className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
										selectedCategory === cat
											? 'bg-blue-600 text-white border-blue-600'
											: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
									}`}
								>
									{cat}
								</button>
							))}
						</div>

						{loading ? (
							<div className="flex justify-center py-20">
								<ProgressSpinner />
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{filteredItems.map((item) => (
									<div
										key={item._id}
										className="relative bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105 cursor-pointer overflow-hidden group"
										onClick={() => navigate(`/clothes/${item._id}`)}
									>
										<img
											src={item.images?.[0] || '/noimage.png'}
											alt={item.title}
											className="w-full h-56 object-cover"
										/>

										{/* Hover overlay */}
										<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
											<p className="text-white text-sm font-semibold">Click to view item</p>
										</div>

										<div className="p-4 bg-white space-y-1 text-sm text-gray-700">
											<h2 className="font-semibold text-lg">{item.title}</h2>
											<p className="text-gray-500 italic">{item.type} • {item.size}</p>
											<p className="text-gray-500">Category: {item.category}</p>
											<p className="text-gray-600">Condition: {item.condition}</p>
											{item.redeemableWith !== 'swap' && (
												<p className="font-medium text-green-700">{item.points} Coins</p>
											)}
											<p className="text-xs text-blue-500 uppercase tracking-wide">
												{item.redeemableWith === 'swap'
													? 'Swap Only'
													: item.redeemableWith === 'points_or_swap'
													? 'Swap or Points'
													: 'Points Only'}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</PageLayout>
			</main>
		</>
	);
};

export default ClothingListPage;
