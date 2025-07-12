import React, { useState, useRef } from 'react';
import { fetchPost } from '../../utils/fetch.utils';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const toast = useRef(null);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		toast.current.clear();

		if (!email || !password) {
			toast.current.show({
				severity: 'warn',
				summary: 'Missing Fields',
				detail: 'Please enter both email and password.',
				life: 3000,
			});
			return;
		}

		const response = await fetchPost({
			pathName: 'auth/login',
			body: JSON.stringify({ email, password }),
			contentType: 'application/json',
		});

		if (response?.success) {
			const { token, role, id } = response.data;
			localStorage.setItem('token', token);
			localStorage.setItem('role', role);
			localStorage.setItem('id', id);

			toast.current.show({
				severity: 'success',
				summary: 'Login Successful',
				detail: 'Welcome back!',
				life: 2000,
			});

			setTimeout(() => {
				if (role === 'admin') navigate('/admin/dashboard');
				else navigate('/user/dashboard');
			}, 1000);
		} else {
			toast.current.show({
				severity: 'error',
				summary: 'Login Failed',
				detail: response.message || 'Invalid credentials',
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
						Welcome Back
					</h2>

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
							Email*
						</label>
					</FloatLabel>

					{/* Password */}
					<FloatLabel className="w-full mb-8">
						<InputText
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-300"
							aria-required="true"
							autoComplete="current-password"
						/>
						<label htmlFor="password" className="text-indigo-600 font-medium">
							Password*
						</label>
					</FloatLabel>

					<Button
						label="Login"
						className="w-full p-button-primary font-semibold py-3 shadow-lg transition-shadow duration-300"
						onClick={handleLogin}
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
