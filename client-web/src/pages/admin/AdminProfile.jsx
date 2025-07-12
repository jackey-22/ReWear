import { useEffect, useRef, useState, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

function AdminProfile() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		address: '',
		dateOfBirth: '',
		gender: '',
		contactNumber: '',
		profileImage: '',
		points: 0,
	});

	const [editMode, setEditMode] = useState(false);
	const [originalData, setOriginalData] = useState(null);

	const fileInputRef = useRef(null);
	const toast = useRef(null);

	const genders = ['Male', 'Female', 'Other'];

	useEffect(() => {
		(async () => {
			try {
				const res = await fetchGet({ pathName: 'admin/profile' });
				setFormData(res.data);
				setOriginalData(res.data);
			} catch {
				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: 'Failed to load profile',
				});
			}
		})();
	}, []);

	const handleChange = useCallback(
		({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value })),
		[]
	);

	const updateField = useCallback(
		(field) => (value) => setFormData((prev) => ({ ...prev, [field]: value })),
		[]
	);

	const handleFileChange = useCallback(({ target: { files } }) => {
		const file = files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
		}
	}, []);

	const handleEdit = useCallback(() => {
		setOriginalData(formData);
		setEditMode(true);
	}, [formData]);

	const handleCancel = useCallback(() => {
		setFormData(originalData);
		setEditMode(false);
	}, [originalData]);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			try {
				await fetchPut({ pathName: 'student/update-profile', body: formData });
				toast.current?.show({
					severity: 'success',
					summary: 'Success',
					detail: 'Profile updated',
				});
				setEditMode(false);
			} catch {
				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: 'Failed to update profile',
				});
			}
		},
		[formData]
	);

	if (!formData) return <PageLayout>Loading...</PageLayout>;

	return (
		<PageLayout>
			<Toast ref={toast} />
			<div className="p-6 relative">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
					{!editMode ? (
						<Button
							icon="pi pi-user-edit"
							className="bg-blue-50 shadow-md"
							rounded
							text
							onClick={handleEdit}
						/>
					) : (
						<div className="flex gap-4 items-center">
							<Button
								icon="pi pi-check"
								severity="success"
								rounded
								text
								onClick={handleSubmit}
								className="bg-green-50 shadow-md"
							/>
							<Button
								icon="pi pi-times"
								severity="danger"
								rounded
								text
								onClick={handleCancel}
								className="bg-red-50 shadow-md"
							/>
						</div>
					)}
				</div>

				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 rounded-md shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
				>
					{/* Left Column: Profile Image */}
					<div className="flex flex-col items-center gap-4">
						<div className="w-32 h-32 rounded-full overflow-hidden border shadow">
							<img
								src={formData.profileImage || 'https://via.placeholder.com/150'}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>
						<Button
							icon="pi pi-camera"
							type="button"
							rounded
							text
							aria-label="Upload Photo"
							onClick={() => fileInputRef.current?.click()}
							disabled={!editMode}
							className="bg-blue-50"
						/>
						<input
							type="file"
							accept="image/*"
							ref={fileInputRef}
							onChange={handleFileChange}
							hidden
						/>

						{/* Points */}
						<div className="flex items-center gap-2 mt-4">
							<i className="pi pi-money-bill text-yellow-600 text-xl" />
							<span className="font-semibold text-lg">{formData.points} Points</span>
						</div>
					</div>

					{/* Right Column: Fields */}
					<div className="flex flex-col gap-4">
						<span className="p-float-label">
							<InputText
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								disabled={!editMode}
								className="w-full"
							/>
							<label htmlFor="name">Name</label>
						</span>

						<span className="p-float-label">
							<InputText
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								disabled={!editMode}
								className="w-full"
							/>
							<label htmlFor="email">Email</label>
						</span>

						<span className="p-float-label">
							<InputText
								id="contactNumber"
								name="contactNumber"
								value={formData.contactNumber}
								onChange={handleChange}
								disabled={!editMode}
								className="w-full"
							/>
							<label htmlFor="contactNumber">Contact Number</label>
						</span>
					</div>
				</form>
			</div>
		</PageLayout>
	);
}

export default AdminProfile;
