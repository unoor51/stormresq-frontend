import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import logo from '../../assets/images/stormresq-logo.png';
import { toast } from 'react-toastify';

const UserResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || '';
    setForm((prev) => ({ ...prev, email, token }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/user/reset-password', form);
      toast.success('Password reset successful! You can now log in.');
      navigate('/user/login');
    } catch (error) {
      if (error.response?.data?.errors) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error resetting password. Try again.');
      }
    }finally{
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20">
      <div className="logo max-w-md text-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[300px]" />
        </Link>
      </div>

      <div className="w-full max-w-md px-4 mt-12">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-center mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="email" value={form.email} />
            <input type="hidden" name="token" value={form.token} />

            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm New Password</label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <button type="submit" className="w-full login-btn" disabled={loading}>
              {loading ? 'Please wait...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserResetPassword;