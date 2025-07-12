import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import { fetchGet } from '../utils/fetch.utils';
import PublicHeader from '../layout/PublicHeader';

function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchItem = async () => {
			const response = await fetchGet({ pathName: `browse-items/${id}` });
			if (response?.success) {
				setProduct(response.data);
			}
			setLoading(false);
		};
		fetchItem();
	}, [id]);

	if (loading || !product) {
		return (
			<>
				<PublicHeader />
				<div className="min-h-screen flex items-center justify-center">
					<p>Loading...</p>
				</div>
			</>
		);
	}

	const btnClassesBase = 'mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white shadow';
	const btnClasses =
		product.redeemableWith === 'Swap Only'
			? `${btnClassesBase} bg-yellow-500 hover:bg-yellow-600`
			: `${btnClassesBase} bg-blue-600 hover:bg-blue-700`;

	return (
		<>
			<PublicHeader />
			<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 pt-24">
				<div className="max-w-6xl mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 gap-10 rounded-3xl bg-white p-8 shadow-xl lg:grid-cols-2">
						<img
							src={product.images?.[0] || '/noimage.png'}
							alt={product.title}
							className="h-[400px] w-full rounded-2xl object-cover shadow"
						/>

						<div className="space-y-4 text-gray-700">
							<h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
							<p><span className="font-medium">Category:</span> {product.category}</p>
							<p><span className="font-medium">Type:</span> {product.type}</p>
							<p><span className="font-medium">Size:</span> {product.size}</p>
							<p><span className="font-medium">Condition:</span> {product.condition}</p>
							<p><span className="font-medium">Availability:</span> {product.availability || 'Available'}</p>

							{product.redeemableWith !== 'Swap Only' && (
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

							{product.redeemableWith === 'points_or_swap' ? (
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
									{product.redeemableWith === 'Swap Only'
										? 'Swap Request'
										: 'Redeem via Points'}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductDetails;
