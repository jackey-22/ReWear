import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../utils/fetch.utils';
import PublicHeader from '../layout/PublicHeader';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';

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
					<Skeleton width="40rem" height="25rem" borderRadius="2rem" />
				</div>
			</>
		);
	}

	const btnSwap = (
		<Button label="Swap Request" icon="pi pi-refresh" className="p-button-warning" />
	);
	const btnPoints = (
		<Button label="Redeem via Points" icon="pi pi-star" className="p-button-primary" />
	);

	const redeemOptions = () => {
		switch (product.redeemableWith) {
			case 'points_or_swap':
				return (
					<div className="flex gap-3">
						{btnSwap}
						{btnPoints}
					</div>
				);
			case 'swap':
				return btnSwap;
			default:
				return btnPoints;
		}
	};

	return (
		<>
			<PublicHeader />
			<div className="pt-24 px-4 md:px-8 pb-10 min-h-screen bg-gray-50">
				<div className="max-w-5xl mx-auto">
					<Card className="p-4 shadow-2 surface-card border-round-3xl">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Product Image */}
							<Image
								src={product.images?.[0] || '/noimage.png'}
								alt={product.title}
								imageClassName="w-full h-[400px] object-cover border-round-xl shadow-3"
							/>

							{/* Product Info */}
							<div className="flex flex-col justify-between">
								<div className="space-y-3">
									<h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>

									<p><strong>Category:</strong> {product.category}</p>
									<p><strong>Type:</strong> {product.type}</p>
									<p><strong>Size:</strong> {product.size}</p>
									<p><strong>Condition:</strong> {product.condition}</p>
									<p><strong>Availability:</strong> {product.availability || 'Available'}</p>

									{product.redeemableWith !== 'swap' && (
										<p className="flex items-center gap-2">
											<Image src="https://cdn-icons-png.flaticon.com/512/649/649972.png" alt="coin icon" width="20" height="20" />
											<span className="font-semibold text-green-700">{product.points} Coins</span>
										</p>
									)}

									<Tag
										value={
											product.redeemableWith === 'points'
												? 'Points Only'
												: product.redeemableWith === 'swap'
												? 'Swap Only'
												: 'Points or Swap'
										}
										severity={
											product.redeemableWith === 'points' ? 'info' : product.redeemableWith === 'swap' ? 'warning' : 'success'
										}
									/>

									{/* Description */}
									<div>
										<h4 className="font-semibold mt-4 mb-1">Description</h4>
										<p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="mt-6">{redeemOptions()}</div>
							</div>
						</div>

						{/* Divider and Owner Details */}
						<Divider className="my-6" />
						<div className="flex items-center gap-4">
							<Avatar icon="pi pi-user" className="bg-primary text-white" size="large" />
							<div className="space-y-1">
								<p className="text-sm text-gray-800">
									<span className="font-medium">Owner Name:</span> {product.ownerId?.name}
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Phone:</span> {product.ownerId?.phone || 'Not provided'}
								</p>
								<p className="text-sm text-gray-600">
									<span className="font-medium">Address:</span> {product.ownerId?.address || 'N/A'}
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</>
	);
}

export default ProductDetails;
