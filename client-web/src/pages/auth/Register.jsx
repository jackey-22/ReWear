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
        life: 3000
      });
      return;
    }

    const data = {
      name,
      email,
      password,
      phone,
      address
    };

    const response = await fetchPost({
      pathName: 'auth/register',
      body: JSON.stringify(data)
    });

    if (response.success) {
      toast.current.show({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'Please login to continue.',
        life: 3000
      });

      setTimeout(() => navigate('/login'), 1500);
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Registration Failed',
        detail: response.message || 'Something went wrong!',
        life: 3000
      });
    }
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="flex justify-center">
            <img src="/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800 tracking-wide uppercase">
            Register
          </h2>

          {/* Name */}
          <FloatLabel className="w-full pt-1">
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <label htmlFor="name">Full Name</label>
          </FloatLabel>

          {/* Email */}
          <FloatLabel className="w-full pt-1">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>

          {/* Password */}
          <FloatLabel className="w-full pt-1">
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>

          {/* Phone */}
          <FloatLabel className="w-full pt-1">
            <InputText
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
            <label htmlFor="phone">Phone Number</label>
          </FloatLabel>

          {/* Address */}
          <FloatLabel className="w-full pt-1">
            <InputTextarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full"
            />
            <label htmlFor="address">Address</label>
          </FloatLabel>

          <Button label="Register" className="w-full bg-blue-400" onClick={handleRegister} />
        </div>
      </div>
    </>
  );
};

export default Register;
