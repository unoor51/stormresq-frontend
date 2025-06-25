import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/admin/login', form);
      localStorage.setItem('admin_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>

        {error && (
          <div className="text-red-600 text-sm mb-4">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;