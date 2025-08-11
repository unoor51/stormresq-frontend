import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import logo from '../../assets/images/stormresq-logo.png';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/admin/login', form);
      localStorage.setItem('admin_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Invalid email or password');
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20" style={{ paddingTop: '2rem' }}>
      <div className="logo max-w-md text-center">
          <Link to="/">
          <img src={logo} alt="Logo" className='w-[300px]' />
          </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm" style={{ marginTop: '3rem' }}
      >
        <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>

        {
          loading ? (
            <Loader />
          ) :(
            <>              
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
                className="w-full login-btn"
              >
                Login
              </button>
            </>    
          )
        }
      </form>
    </div>
  );
};

export default AdminLogin;