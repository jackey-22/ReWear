// Same imports as before
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FilterMatchMode } from 'primereact/api';

import PageLayout from '../../layout/PageLayout';
import { fetchGet, fetchPost } from '../../utils/fetch.utils';

function VerifyProduct() {
	const [items, setItems] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalItem, setModalItem] = useState(null);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImageIndex, setPreviewImageIndex] = useState(0);
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const [rejectReasonVisible, setRejectReasonVisible] = useState(false);
	const [rejectReason, setRejectReason] = useState('');
	const [rejectingItemId, setRejectingItemId] = useState(null);

	const token = localStorage.getItem('token');

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		const response = await fetchGet({ pathName: 'admin/unverified-list', token });
		if (response && response.length) {
			setItems(response);
		}
	};

	const handleApprove = async (id) => {
		const res = await fetchPost({ pathName: `admin/${id}/approve`, token });
		if (res && res.item) {
			setItems((prev) => prev.filter((item) => item._id !== id));
			alert('✅ Item approved');
		} else {
			alert('❌ Approval failed');
		}
	};

	const confirmReject = (id) => {
		setRejectingItemId(id);
		setRejectReason('');
		setRejectReasonVisible(true);
	};

	const submitReject = async () => {
		if (!rejectReason) {
			alert('Please enter a reason.');
			return;
		}
		const res = await fetchPost({
			pathName: `admin/${rejectingItemId}/reject`,
			token,
			body: JSON.stringify({ reason: rejectReason })
		});
		if (res && res.item) {
			setItems((prev) => prev.filter((item) => item._id !== rejectingItemId));
			alert('❌ Item rejected');
			setRejectReasonVisible(false);
		} else {
			alert('❌ Rejection failed');
		}
	};

	const itemImageBody = (item) => (
		<img
			src={item.images?.[0]}
			alt="item"
			className="w-16 h-16 object-cover rounded shadow border cursor-pointer"
			onClick={() => {
				setModalItem(item);
				setPreviewImageIndex(0);
				setPreviewVisible(true);
			}}
		/>
	);

	const actionBody = (item) => (
		<div className="flex gap-2">
			<Button label="Approve" className="p-button-sm p-button-success" onClick={() => handleApprove(item._id)} />
			<Button label="Reject" className="p-button-sm p-button-danger" onClick={() => confirmReject(item._id)} />
		</div>
	);

	const detailBody = (item) => (
		<Button
			label="Details"
			className="p-button-sm p-button-outlined p-button-info"
			onClick={() => {
				setModalItem(item);
				setModalVisible(true);
			}}
		/>
	);

	const indexBody = (rowData, options) => <span>{options.rowIndex + 1}</span>;

	return (
		<PageLayout>
			<div className="p-6 bg-white rounded shadow-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-semibold text-primary">🧾 Verify Product Listings</h2>
					<input
						type="text"
						placeholder="🔍 Search..."
						value={globalFilterValue}
						onChange={(e) => {
							const val = e.target.value;
							let updatedFilters = { ...filters };
							updatedFilters['global'].value = val;
							setFilters(updatedFilters);
							setGlobalFilterValue(val);
						}}
						className="p-inputtext p-component border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
					/>
				</div>

				<DataTable
					value={items}
					paginator
					rows={5}
					dataKey="_id"
					sortMode="multiple"
					filterDisplay="menu"
					globalFilterFields={['title', 'category', 'type', 'ownerId.name']}
					filters={filters}
					responsiveLayout="scroll"
					className="p-datatable-sm"
					emptyMessage="No items pending approval."
				>
					<Column header="#" body={indexBody} style={{ width: '3rem' }} />
					<Column header="Image" body={itemImageBody} style={{ width: '6rem' }} />
					<Column field="title" header="Title" sortable />
					<Column field="category" header="Category" sortable />
					<Column field="type" header="Type" sortable />
					<Column field="ownerId.name" header="Uploader" sortable />
					<Column header="Details" body={detailBody} />
					<Column header="Actions" body={actionBody} />
				</DataTable>

				{/* Item Detail Modal */}
				<Dialog
					header="📝 Item Details"
					visible={modalVisible}
					onHide={() => setModalVisible(false)}
					style={{ width: '50vw' }}
					className="p-fluid"
				>
					{modalItem && (
						<div className="space-y-4">
							<div className="text-sm text-gray-800 space-y-1">
								<h3 className="text-lg font-semibold text-gray-700 border-b pb-1">👤 Uploader Info</h3>
								<p><strong>Name:</strong> {modalItem.ownerId?.name}</p>
								<p><strong>Email:</strong> {modalItem.ownerId?.email}</p>
								<p><strong>Phone:</strong> {modalItem.ownerId?.phone}</p>
								<p><strong>Points:</strong> {modalItem.ownerId?.points}</p>
							</div>
							<hr />
							<div className="text-sm text-gray-800 space-y-1">
								<h3 className="text-lg font-semibold text-gray-700 border-b pb-1">🧥 Product Info</h3>
								<p><strong>Title:</strong> {modalItem.title}</p>
								<p><strong>Category:</strong> {modalItem.category}</p>
								<p><strong>Type:</strong> {modalItem.type}</p>
								<p><strong>Size:</strong> {modalItem.size}</p>
								<p><strong>Condition:</strong> {modalItem.condition}</p>
								<p><strong>Description:</strong> {modalItem.description}</p>
								<div className="flex flex-wrap gap-2 mt-2">
									<strong>Tags:</strong>
									{modalItem.tags?.map((tag, i) => (
										<span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					)}
				</Dialog>

				{/* Full Image Preview Modal */}
				<Dialog
					header="🖼️ Image Preview"
					visible={previewVisible}
					onHide={() => setPreviewVisible(false)}
					style={{ width: '70vw' }}
				>
					{modalItem?.images?.[previewImageIndex] && (
						<img
							src={modalItem.images[previewImageIndex]}
							alt="Large Preview"
							className="w-full max-h-[75vh] object-contain rounded shadow"
						/>
					)}
					<div className="flex gap-2 mt-4 overflow-x-auto">
						{modalItem?.images.map((img, i) => (
							<img
								key={i}
								src={img}
								alt={`thumb-${i}`}
								className={`h-16 w-24 object-cover rounded-md cursor-pointer border ${
									i === previewImageIndex ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-300'
								}`}
								onClick={() => setPreviewImageIndex(i)}
							/>
						))}
					</div>
				</Dialog>

				{/* Reject Reason Modal */}
				<Dialog
					header="Reason for Rejection"
					visible={rejectReasonVisible}
					onHide={() => setRejectReasonVisible(false)}
					style={{ width: '40vw' }}
				>
					<div className="space-y-3">
						<label htmlFor="reason" className="font-medium text-gray-700">Write reason:</label>
						<InputTextarea
							id="reason"
							value={rejectReason}
							onChange={(e) => setRejectReason(e.target.value)}
							rows={4}
							autoResize
							className="w-full border rounded p-2"
							placeholder="E.g., Image unclear, inappropriate item, etc."
						/>
						<div className="flex justify-end gap-2 mt-4">
							<Button label="Cancel" onClick={() => setRejectReasonVisible(false)} className="p-button-text" />
							<Button label="Reject" severity="danger" onClick={submitReject} />
						</div>
					</div>
				</Dialog>
			</div>
		</PageLayout>
	);
}

export default VerifyProduct;
