import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from './../utils/fetch.utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import PublicHeader from '../layout/PublicHeader';

export default function ClothingListPage() {
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
			: items.filter(
					(item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
			  );

	return (
		<>
			<PublicHeader />

			<main className="pt-24 px-4 md:px-10 bg-gradient-to-br from-white to-blue-50 min-h-screen">
				<div className="max-w-7xl mx-auto p-8 bg-white/90 shadow-2xl rounded-3xl border border-blue-200">
					<h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center drop-shadow-sm">
						Available Clothes
					</h1>
					<p className="text-blue-700 text-base mb-10 text-center tracking-wide">
						Click on any item to view details or redeem.
					</p>

					{/* Category Filters */}
					<div className="flex flex-wrap gap-4 mb-12 justify-center">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-6 py-2 rounded-full border font-semibold transition-shadow duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
									selectedCategory === cat
										? 'bg-blue-600 text-white border-blue-600 shadow-lg'
										: 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
								}`}
								aria-pressed={selectedCategory === cat}
							>
								{cat}
							</button>
						))}
					</div>

					{loading ? (
						<div className="flex justify-center py-24">
							<ProgressSpinner
								style={{ width: '64px', height: '64px' }}
								strokeWidth="6"
							/>
						</div>
					) : filteredItems.length === 0 ? (
						<p className="text-center text-gray-500 text-lg">
							No items found in this category.
						</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
							{filteredItems.map((item) => {
								const imageUrl = item.images?.[0]
									? `${import.meta.env.VITE_URL}${item.images[0]}`
									: '/noimage.png';

								return (
									<div
										key={item._id}
										className="relative bg-gradient-to-tr from-white to-blue-50 border border-blue-200 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-[1.04] cursor-pointer overflow-hidden group"
										onClick={() => navigate(`/clothes/${item._id}`)}
										role="button"
										tabIndex={0}
										onKeyPress={(e) => {
											if (e.key === 'Enter') navigate(`/clothes/${item._id}`);
										}}
										aria-label={`View details of ${item.title}`}
									>
										<img
											src={imageUrl}
											alt={item.title}
											className="w-full h-56 object-cover rounded-t-3xl"
											loading="lazy"
										/>

										{/* Hover Overlay */}
										<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
											<p className="text-white text-sm font-semibold tracking-wide select-none">
												Click to view item
											</p>
										</div>

										<div className="p-5 space-y-2 text-gray-800">
											<h2 className="font-bold text-xl text-blue-900">
												{item.title}
											</h2>
											<p className="text-gray-600 italic text-sm">
												{item.type} • {item.size}
											</p>
											<p className="text-blue-700 font-semibold tracking-wide">
												Category: {item.category}
											</p>
											<p className="text-gray-700">
												Condition: {item.condition}
											</p>

											{item.redeemableWith !== 'swap' && (
												<p className="font-semibold text-green-700">
													{item.points} Coins
												</p>
											)}

											<p className="text-xs uppercase tracking-widest text-blue-500 font-medium">
												{item.redeemableWith === 'swap'
													? 'Swap Only'
													: item.redeemableWith === 'points_or_swap'
													? 'Swap or Points'
													: 'Points Only'}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</main>
		</>
	);
}
