import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog } from 'primereact/dialog';
import PageLayout from '../../layout/PageLayout';

export default function AddItemPage() {
	const [form, setForm] = useState({
		title: '',
		description: '',
		category: '',
		type: '',
		size: '',
		condition: '',
		tags: [],
		redeemableWith: 'points_or_swap',
		points: '',
		status: 'available',
	});

	const [imageFiles, setImageFiles] = useState([]);
	const [previewUrls, setPreviewUrls] = useState([]);
	const [items, setItems] = useState([]);

	const [filteredTypes, setFilteredTypes] = useState([]);
	const [filteredConditions, setFilteredConditions] = useState([]);

	// Modal visibility state
	const [visible, setVisible] = useState(false);

	const typeOptions = ['Shirt', 'Jacket', 'Pants', 'Kurta', 'Top'];
	const conditionOptions = ['New', 'Like New', 'Gently Used', 'Used'];
	const categories = ['Men', 'Women', 'Kids'];
	const sizes = ['XS', 'S', 'M', 'L', 'XL'];
	const redeemOptions = ['points', 'swap', 'points_or_swap'];

	const handleChange = (field, value) => {
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleImageUpload = (e) => {
		const files = Array.from(e.files);
		setImageFiles(files);
		setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
	};

	const searchType = (query) => {
		const filtered = [...new Set([...typeOptions, form.type])].filter((item) =>
			item.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredTypes(filtered);
	};

	const searchCondition = (query) => {
		const filtered = [...new Set([...conditionOptions, form.condition])].filter((item) =>
			item.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredConditions(filtered);
	};

	const fetchItems = async () => {
		try {
			const token = localStorage.getItem('token');

			const res = await fetch(import.meta.env.VITE_URL + 'user/fetch-product', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();
			setItems(data);
		} catch (err) {
			console.error('Fetch error:', err);
		}
	};

	const handleSubmit = async () => {
		if (
			!form.title ||
			!form.description ||
			!form.category ||
			!form.type ||
			!form.size ||
			!form.condition
		) {
			alert('Please fill in all required fields');
			return;
		}

		if (imageFiles.length === 0) {
			alert('Please upload at least one image');
			return;
		}

		const formData = new FormData();
		Object.entries(form).forEach(([key, value]) => {
			if (key === 'tags') {
				value.forEach((tag) => formData.append('tags', tag));
			} else if (key === 'points' && form.redeemableWith === 'swap') {
				// skip points
			} else if (key === 'points') {
				formData.append(key, Number(value));
			} else {
				formData.append(key, value);
			}
		});
		imageFiles.forEach((file) => formData.append('images', file));

		const token = localStorage.getItem('token');
		try {
			const res = await fetch(import.meta.env.VITE_URL + 'user/add-product', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
				},
				body: formData,
			});
			const data = await res.json();
			if (res.ok) {
				alert('Item added!');
				setForm({
					title: '',
					description: '',
					category: '',
					type: '',
					size: '',
					condition: '',
					tags: [],
					redeemableWith: 'points_or_swap',
					points: 0,
					status: 'available',
				});
				setImageFiles([]);
				setPreviewUrls([]);
				fetchItems();
				setVisible(false); // Close modal after successful submit
			} else {
				alert(data.error || 'Error saving item');
			}
		} catch (err) {
			console.error(err);
			alert('Server error');
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<PageLayout>
			<div className="p-4">
				<h2 className="text-2xl font-semibold mb-3">Clothing Items</h2>

				{/* Button to open modal */}
				<Button
					label="Add Item"
					icon="pi pi-plus"
					onClick={() => setVisible(true)}
					className="mb-4"
				/>

				{/* List of uploaded items */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{items.map((item, idx) => (
						<Card
							key={idx}
							title={item.title}
							subTitle={`${item.category} - ${item.size}`}
						>
							{item.images?.[0] && (
								<img
									src={`${import.meta.env.VITE_URL}${item.images[0]}`}
									alt={item.title}
									className="w-full h-40 object-cover mb-2"
								/>
							)}
							<p>{item.description}</p>
							<p className="mt-2 text-sm text-gray-600">
								Type: {item.type} | Condition: {item.condition}
							</p>
							<p className="text-sm text-gray-600">Redeem: {item.redeemableWith}</p>
							{item.redeemableWith !== 'swap' && (
								<p className="text-sm">Points: {item.points}</p>
							)}
							<div className="flex gap-1 mt-2 flex-wrap">
								{item.tags?.map((tag, i) => (
									<Tag key={i} value={tag} />
								))}
							</div>
						</Card>
					))}
				</div>

				{/* Modal/Dialog for Add Item Form */}
				<Dialog
					header="Add Clothing Item"
					visible={visible}
					style={{ width: '70vw', maxWidth: '900px' }}
					onHide={() => setVisible(false)}
					modal
					draggable={false}
					resizable={false}
					className="p-fluid"
				>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card className="md:col-span-1">
							<FileUpload
								name="images"
								mode="basic"
								accept="image/*"
								multiple
								customUpload
								auto
								maxFileSize={1000000}
								onSelect={handleImageUpload}
								chooseLabel="Upload Images"
							/>
							<div className="grid grid-cols-2 gap-2 mt-2">
								{previewUrls.map((src, i) => (
									<img
										key={i}
										src={src}
										className="w-full h-32 object-cover"
										alt="preview"
									/>
								))}
							</div>
						</Card>

						<Card className="md:col-span-2">
							<div className="grid formgrid gap-3 p-fluid">
								<div className="field col-12">
									<label>Title</label>
									<InputText
										value={form.title}
										onChange={(e) => handleChange('title', e.target.value)}
									/>
								</div>

								<div className="field col-12">
									<label>Description</label>
									<InputTextarea
										rows={3}
										value={form.description}
										onChange={(e) =>
											handleChange('description', e.target.value)
										}
									/>
								</div>

								<div className="field col-6">
									<label>Category</label>
									<Dropdown
										value={form.category}
										options={categories}
										onChange={(e) => handleChange('category', e.value)}
										placeholder="Select"
									/>
								</div>

								<div className="field col-6">
									<label>Size</label>
									<Dropdown
										value={form.size}
										options={sizes}
										onChange={(e) => handleChange('size', e.value)}
										placeholder="Select"
									/>
								</div>

								<div className="field col-6">
									<label>Type</label>
									<AutoComplete
										value={form.type}
										suggestions={filteredTypes}
										completeMethod={(e) => searchType(e.query)}
										onChange={(e) => handleChange('type', e.value)}
										dropdown
										placeholder="e.g., Shirt"
									/>
								</div>

								<div className="field col-6">
									<label>Condition</label>
									<AutoComplete
										value={form.condition}
										suggestions={filteredConditions}
										completeMethod={(e) => searchCondition(e.query)}
										onChange={(e) => handleChange('condition', e.value)}
										dropdown
										placeholder="e.g., Like New"
									/>
								</div>

								<div className="field col-6">
									<label>Redeemable With</label>
									<Dropdown
										value={form.redeemableWith}
										options={redeemOptions}
										onChange={(e) => handleChange('redeemableWith', e.value)}
									/>
								</div>

								{form.redeemableWith !== 'swap' && (
									<div className="field col-6">
										<label>Points</label>
										<InputText
											type="number"
											value={form.points}
											onChange={(e) =>
												handleChange('points', Number(e.target.value))
											}
										/>
									</div>
								)}

								<div className="field col-12">
									<label>Tags</label>
									<Chips
										value={form.tags}
										onChange={(e) => handleChange('tags', e.value)}
									/>
								</div>

								<div className="field col-12 flex justify-content-end">
									<Button
										label="Submit Item"
										onClick={handleSubmit}
										className="p-button-success"
									/>
								</div>
							</div>
						</Card>
					</div>
				</Dialog>
			</div>
		</PageLayout>
	);
}
