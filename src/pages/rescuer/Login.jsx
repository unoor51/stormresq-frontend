import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import logo from '../../assets/images/stormresq-logo.png';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/rescuer/login', {
        email: form.email,
        password: form.password,
      });

      // Save token
      localStorage.setItem('rescue_token', response.data.token);

      // Redirect to dashboard
      navigate('/rescuer/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.response?.data?.errors) {
        toast.error(error.response.data.message);
      } else if(error.response.status === 403) {
        toast.error(error.response.data.message);
      }else{
        toast.error('Login error. Try again.');
      }
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20" style={{ padding: '2rem' }}>
      <div className="logo max-w-md text-center">
        <Link to="/">
        <img src={logo} alt="Logo" className='w-[300px]' />
        </Link>
      </div>
      <div className="w-full max-w-md px-4" style={{ marginTop: '2rem' }}>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-center mb-4">Rescuer Login</h2>
          {loading ? (
            <Loader />
          ) : (
            <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
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
              <div className="flex flex-start mt-6" style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/rescuer/forgot-password" className="text-orange-500 font-semibold border-b-2 border-orange-500">Forgot Password</Link>
              </div>
              <button type="submit" className="w-full login-btn">
                Login
              </button>
            </form>
            <div className="flex items-center justify-center text-sm mt-6">
              <span>
                Don't have an account? <Link to="/rescuer/signup" className="text-orange-500 font-semibold hover:text-orange-600 hover:border-b-2 hover:border-orange-500">Sign Up Here</Link>.
              </span>
            </div>
            </>
          )}
        </div>
      </div>
      <div className='splash-screen-wrapper'>
        <footer className="footer-main">
          <div className="footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </div>
          <div className="copyright">
              <p>&copy; 2025 StormResQ. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;