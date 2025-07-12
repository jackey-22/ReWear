import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { fetchGet } from '../utils/fetch.utils';
import PublicHeader from '../layout/PublicHeader';

export default function HomePage() {
	const navigate = useNavigate();
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetchGet({ pathName: 'browse-items/' }).then((res) => {
			if (res?.data) setItems(res.data.slice(0, 10));
		});
	}, []);

	const itemTemplate = (item) => (
		<div className="p-3">
			<div
				className="bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer overflow-hidden"
				onClick={() => navigate(`/products/${item._id}`)}
			>
				<img
					src={
						item.images?.[0]
							? `${import.meta.env.VITE_URL}${item.images[0]}`
							: '/noimage.png'
					}
					alt={item.title}
					className="w-full h-40 object-cover"
				/>

				<div className="p-3 space-y-1 text-sm">
					<h4 className="font-semibold text-gray-800">{item.title}</h4>
					<p className="text-gray-500">
						{item.category} • {item.size}
					</p>
				</div>
			</div>
		</div>
	);

	const features = [
		{
			title: 'List Your Clothes',
			desc: 'Easily upload clothes you no longer wear. Add images, size, condition, and redeem type.',
			icon: 'pi pi-upload',
		},
		{
			title: 'Swap with Community',
			desc: 'Send swap requests to others and exchange items directly — no cash involved!',
			icon: 'pi pi-sync',
		},
		{
			title: 'Earn and Spend Coins',
			desc: 'Earn coins for every item you give away. Use them to redeem new clothes.',
			icon: 'pi pi-coins',
		},
		{
			title: 'Verified Listings',
			desc: 'All listings are reviewed before going live to ensure quality and trust.',
			icon: 'pi pi-check-circle',
		},
	];

	return (
		<>
			<PublicHeader />
			<main className="pt-24 px-4 md:px-10">
				{/* Hero Section */}
				<section className="text-center mb-16">
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
						ReWear – Swap Clothes, Save the Planet 🌍
					</h1>
					<p className="text-gray-600 max-w-xl mx-auto mb-6">
						India’s first community clothing exchange platform. Give your clothes a
						second life, earn points, and discover unique fashion.
					</p>
					<div className="flex justify-center gap-4 flex-wrap">
						<Button
							label="Start Swapping"
							icon="pi pi-sync"
							className="p-button-lg"
							onClick={() => navigate('/register')}
						/>
						<Button
							label="Browse Items"
							icon="pi pi-search"
							className="p-button-outlined p-button-lg"
							onClick={() => navigate('/products')}
						/>
						<Button
							label="List an Item"
							icon="pi pi-plus"
							className="p-button-secondary p-button-lg"
							onClick={() => navigate('/login')}
						/>
					</div>
				</section>

				{/* Featured Carousel */}
				<section className="mb-20">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Featured Clothing Items
					</h2>
					{items.length > 0 ? (
						<Carousel
							value={items}
							numVisible={3}
							numScroll={1}
							responsiveOptions={[
								{ breakpoint: '1024px', numVisible: 2, numScroll: 1 },
								{ breakpoint: '768px', numVisible: 1, numScroll: 1 },
							]}
							itemTemplate={itemTemplate}
						/>
					) : (
						<p className="text-gray-500">No items available to display.</p>
					)}
				</section>

				{/* Features Section */}
				<section className="mb-20">
					<h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
						What ReWear Offers
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature, idx) => (
							<div
								key={idx}
								className="bg-white shadow-md rounded-xl p-6 text-center space-y-3"
							>
								<i className={`${feature.icon} text-blue-600 text-3xl`}></i>
								<h4 className="text-lg font-semibold text-gray-800">
									{feature.title}
								</h4>
								<p className="text-sm text-gray-600">{feature.desc}</p>
							</div>
						))}
					</div>
				</section>

				{/* Call to Action Footer Banner */}
				<section className="bg-blue-600 text-white text-center py-16 rounded-xl shadow-lg mb-10">
					<h2 className="text-2xl font-bold mb-3">Ready to make a difference?</h2>
					<p className="mb-6">
						Join thousands swapping clothes and reducing fashion waste. It's free, fun,
						and impactful.
					</p>
					<Button
						label="Join Now"
						icon="pi pi-user-plus"
						className="p-button-rounded p-button-lg p-button-warning text-blue-800"
						onClick={() => navigate('/register')}
					/>
				</section>
			</main>
		</>
	);
}
