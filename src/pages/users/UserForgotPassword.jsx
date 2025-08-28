import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import logo from '../../assets/images/stormresq-logo.png';
import { toast } from 'react-toastify';

const UserForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/user/forgot-password', { email });
      toast.success('Reset link sent to your email.');
      setEmail('');
    } catch (error) {
      if (error.response?.data?.errors) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error sending reset link. Try again.')
      }
    }finally {
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

      <div className="w-full max-w-md px-4 mt-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
             <button type="submit" className="w-full login-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
            <div className="flex items-center justify-center text-sm mt-6">
              <span>
                Back to <Link to="/user/login" className="text-orange-500 font-semibold hover:text-orange-600 hover:border-b-2 hover:border-orange-500">Login</Link>.
              </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserForgotPassword;