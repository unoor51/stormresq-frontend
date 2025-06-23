import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // TODO: Connect to API
     try {
      const response = await api.post('/login', {
        phone: form.phone,
        password: form.password,
      });
      const { access_token, user } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', user.role);

      console.log('Form submitted:', response.data);
      // Redirect after success (simulated)
      navigate('/rescuer/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      // alert('Login Failed: Please check your credentials and try again.')
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-around mb-6">
          <Link to="/rescuer/login" className="text-orange-600 font-semibold border-b-2 border-orange-500">Rescuer Login</Link>
          <Link to="/rescuer/signup" className="text-gray-600 font-semibold hover:text-orange-600">Rescuer Signup</Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-center mb-4">Rescuer Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;