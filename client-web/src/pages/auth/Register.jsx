import React, { useState, useRef } from 'react';
import { fetchPost } from '../../utils/fetch.utils';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [password, setPassword] = useState('');
	const toast = useRef(null);
	const navigate = useNavigate();

	const handleRegister = async () => {
		if (!name || !email || !password) {
			toast.current.show({
				severity: 'warn',
				summary: 'Missing Fields',
				detail: 'Name, Email and Password are required.',
				life: 3000,
			});
			return;
		}

		const data = {
			name,
			email,
			password,
			phone,
			address,
		};

		const response = await fetchPost({
			pathName: 'auth/register',
			body: JSON.stringify(data),
		});

		if (response.success) {
			toast.current.show({
				severity: 'success',
				summary: 'Registration Successful',
				detail: 'Please login to continue.',
				life: 3000,
			});

			setTimeout(() => navigate('/login'), 1500);
		} else {
			toast.current.show({
				severity: 'error',
				summary: 'Registration Failed',
				detail: response.message || 'Something went wrong!',
				life: 3000,
			});
		}
	};

	return (
		<>
			<Toast ref={toast} position="top-right" />

			<div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-cyan-100 px-4">
				<div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-10 border border-indigo-200">
					{/* Logo */}
					<div className="flex justify-center mb-8">
						<img
							src="/logo.png"
							alt="Logo"
							className="h-20 w-20 object-contain drop-shadow-md"
							loading="lazy"
						/>
					</div>

					<h2 className="text-3xl font-extrabold text-indigo-900 text-center mb-8 tracking-wide">
						Create Your Account
					</h2>

					{/* Name */}
					<FloatLabel className="w-full mb-6">
						<InputText
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300"
							aria-required="true"
							aria-describedby="nameHelp"
							autoComplete="name"
						/>
						<label htmlFor="name" className="text-indigo-600 font-medium">
							Full Name*
						</label>
					</FloatLabel>

					{/* Email */}
					<FloatLabel className="w-full mb-6">
						<InputText
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300"
							type="email"
							aria-required="true"
							aria-describedby="emailHelp"
							autoComplete="email"
						/>
						<label htmlFor="email" className="text-indigo-600 font-medium">
							Email Address*
						</label>
					</FloatLabel>

					{/* Password */}
					<FloatLabel className="w-full mb-6">
						<InputText
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300"
							aria-required="true"
							autoComplete="new-password"
						/>
						<label htmlFor="password" className="text-indigo-600 font-medium">
							Password*
						</label>
					</FloatLabel>

					{/* Phone */}
					<FloatLabel className="w-full mb-6">
						<InputText
							id="phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300"
							type="tel"
							autoComplete="tel"
						/>
						<label htmlFor="phone" className="text-indigo-600 font-medium">
							Phone Number
						</label>
					</FloatLabel>

					{/* Address */}
					<FloatLabel className="w-full mb-8">
						<InputTextarea
							id="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							rows={3}
							className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300 resize-none"
						/>
						<label htmlFor="address" className="text-indigo-600 font-medium">
							Address
						</label>
					</FloatLabel>

					<Button
						label="Register"
						className="w-full p-button-primary font-semibold py-3 shadow-lg transition-shadow duration-300"
						onClick={handleRegister}
					/>
				</div>
			</div>
		</>
	);
};

export default Register;
