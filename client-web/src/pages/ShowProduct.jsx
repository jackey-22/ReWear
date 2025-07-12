import React, { useState } from 'react';
import { Image } from 'primereact/image';

const clothes = [
	{
		id: 1,
		title: 'Classic Cotton T-Shirt',
		type: 'T-Shirt',
		category: 'Men',
		color: 'Navy Blue',
		size: 'XL',
		points: 250,
		redeemWith: 'Buy with Points',
		image: 'https://images.unsplash.com/photo-1598971863322-fd98b0fbc9be?auto=format&fit=crop&w=800&q=60',
	},
	{
		id: 2,
		title: 'Elegant Blouse',
		type: 'Blouse',
		category: 'Women',
		color: 'White',
		size: 'M',
		points: 400,
		redeemWith: 'Swap or Points',
		image: 'https://images.unsplash.com/photo-1618354891608-59d2378a2bc9?auto=format&fit=crop&w=800&q=60',
	},
	{
		id: 3,
		title: 'Kids Printed Shirt',
		type: 'Shirt',
		category: 'Children',
		color: 'Yellow',
		size: 'S',
		points: 150,
		redeemWith: 'Swap Only',
		image: 'https://images.unsplash.com/photo-1520975979415-7b5b0e1f0da1?auto=format&fit=crop&w=800&q=60',
	},
];

export default function ClothingListPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');

	const categories = ['All', 'Men', 'Women', 'Children'];
	const filteredClothes =
		selectedCategory === 'All'
			? clothes
			: clothes.filter((item) => item.category === selectedCategory);

	return (
		<main className="min-h-screen bg-gray-50 p-6">
			<header className="mb-6 text-center">
				<h1 className="text-3xl font-extrabold tracking-tight text-gray-800 md:text-4xl">
					Available Wearables
				</h1>
				<p className="mt-1 text-sm text-gray-500">
					Browse and redeem clothes using your points or swap
				</p>
			</header>

			<div className="flex justify-center gap-4 mb-8">
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

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{filteredClothes.map((item) => (
					<div
						key={item.id}
						className="overflow-hidden rounded-2xl bg-white shadow transition-shadow hover:shadow-lg"
					>
						<div className="relative">
							<img
								src={item.image}
								alt={item.title}
								className="h-56 w-full object-cover"
							/>
						</div>

						<div className="p-4 space-y-2 text-sm text-gray-700">
							<p className="text-sm text-gray-500 italic">{item.type}</p>

							<div className="text-sm text-gray-700">
								<span className="font-medium">Color:</span> {item.color}
							</div>

							<div className="text-sm text-gray-700">
								<span className="font-medium">Size:</span> {item.size}
							</div>

							{item.redeemWith !== 'Swap Only' && (
								<div className="flex items-center gap-2 text-sm text-gray-800">
									<Image
										src="https://cdn-icons-png.flaticon.com/512/649/649972.png"
										alt="coin icon"
										width="20"
										height="20"
										className="inline-block"
									/>
									<span className="font-semibold">{item.points} coins</span>
								</div>
							)}

							<div className="inline-block rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold">
								{item.redeemWith === 'Swap Only'
									? 'Swap Request'
									: 'Redeem via Points'}
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
