import React from 'react';
import { Image } from 'primereact/image';
import PageLayout from '../layout/PageLayout';
import PublicHeader from '../layout/PublicHeader';

const product = {
	id: '1',
	title: 'Classic Cotton T‑Shirt',
	type: 'T‑Shirt',
	category: 'Men',
	color: 'Navy Blue',
	size: 'XL',
	points: 250,
	redeemWith: 'Buy with Points',
	description:
		'Soft 100% cotton T‑shirt with a classic fit and navy blue shade. Perfect for everyday wear.',
	availability: 'Available',
	image: 'https://images.unsplash.com/photo-1598971863322-fd98b0fbc9be?auto=format&fit=crop&w=800&q=60',
};

const previousItems = [
	{
		id: '2',
		title: 'Elegant Blouse',
		image: 'https://images.unsplash.com/photo-1618354891608-59d2378a2bc9?auto=format&fit=crop&w=800&q=60',
	},
	{
		id: '3',
		title: 'Kids Printed Shirt',
		image: 'https://images.unsplash.com/photo-1520975979415-7b5b0e1f0da1?auto=format&fit=crop&w=800&q=60',
	},
	{
		id: '4',
		title: 'Vintage Jacket',
		image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=60',
	},
	{
		id: '5',
		title: 'Striped Polo',
		image: 'https://images.unsplash.com/photo-1533674689015-17e0b7c1c2c3?auto=format&fit=crop&w=800&q=60',
	},
];

function ProductDetails() {
	const btnClassesBase = 'mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white shadow';
	const btnClasses =
		product.redeemWith === 'Swap Only'
			? `${btnClassesBase} bg-yellow-500 hover:bg-yellow-600`
			: `${btnClassesBase} bg-blue-600 hover:bg-blue-700`;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
			<div className="max-w-6xl mx-auto px-4 md:px-8">
				<header className="mb-10 text-center"></header>

				<div className="grid grid-cols-1 gap-10 rounded-3xl bg-white p-8 shadow-xl lg:grid-cols-2">
					{/* Image */}
					<img
						src={product.image}
						alt={product.title}
						className="h-[400px] w-full rounded-2xl object-cover shadow"
					/>

					{/* Info */}
					<div className="space-y-4 text-gray-700">
						<div>
							<span className="font-medium">Category:</span> {product.category}
						</div>
						<div>
							<span className="font-medium">Type:</span> {product.type}
						</div>
						<div>
							<span className="font-medium">Size:</span> {product.size}
						</div>
						<div>
							<span className="font-medium">Availability:</span>{' '}
							{product.availability}
						</div>
						{product.redeemWith !== 'Swap Only' && (
							<div className="flex items-center gap-2">
								<Image
									src="https://cdn-icons-png.flaticon.com/512/649/649972.png"
									alt="coin icon"
									width="20"
									height="20"
								/>
								<span className="font-semibold">{product.points} coins</span>
							</div>
						)}

						<div>
							<h4 className="text-base font-semibold text-gray-800 mb-1 mt-4">
								Description
							</h4>
							<p className="text-sm leading-relaxed text-gray-600">
								{product.description}
							</p>
						</div>

						{product.redeemWith === 'Swap or Points' ? (
							<div className="flex gap-4 mt-4">
								<button className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-yellow-500 hover:bg-yellow-600 shadow">
									Swap Request
								</button>
								<button className="px-6 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow">
									Redeem via Points
								</button>
							</div>
						) : (
							<button className={btnClasses}>
								{product.redeemWith === 'Swap Only'
									? 'Swap Request'
									: 'Redeem via Points'}
							</button>
						)}
					</div>
				</div>

				{/* Previous Listings */}
				<section className="mt-20 px-4 md:px-8">
					<h3 className="mb-6 text-2xl font-semibold text-gray-800">Previous Listings</h3>
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
						{previousItems.map((item) => (
							<div key={item.id} className="w-full">
								<img
									src={item.image}
									alt={item.title}
									className="aspect-[4/3] w-full rounded-lg object-cover shadow"
								/>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}

export default ProductDetails;
