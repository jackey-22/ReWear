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
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
					{/* Logo */}
					<div className="flex justify-center">
						<img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
					</div>

					<h2 className="text-xl font-semibold text-center text-gray-800 tracking-wide uppercase">
						Login
					</h2>

					{/* Email Field */}
					<FloatLabel>
						<InputText
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full"
						/>
						<label htmlFor="email">Email</label>
					</FloatLabel>

					{/* Password Field */}
					<FloatLabel className="pt-1 w-full">
						<InputText
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full"
						/>
						<label htmlFor="password">Password</label>
					</FloatLabel>

					<Button label="Login" className="w-full bg-blue-400" onClick={handleLogin} />
				</div>
			</div>
		</>
	);
};

export default Login;
