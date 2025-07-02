import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Modal from '../components/Modal';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [successMessage,setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/rescuer/register', {
        phone: form.phone,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });

      setShowModal(true);
      setSuccessMessage(response.data.message);

      setForm({
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.error('Validation Errors:', error.response.data.errors);
        alert('Validation failed: ' + JSON.stringify(error.response.data.errors));
      } else {
        alert('Something went wrong. Please try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-around mb-6">
          <Link to="/rescuer/login" className="text-gray-600 font-semibold hover:text-orange-600">Rescuer Login</Link>
          <Link to="/rescuer/signup" className="text-orange-600 font-semibold border-b-2 border-orange-500">Rescuer Signup</Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold text-center mb-4">Rescuer Signup</h2>
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
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
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

            <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
              Signup
            </button>
          </form>
        </div>
      </div>
      {/* Modal appears here after submission */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message={successMessage}
        title="Request Submitted"
      />
    </div>
  );
};

export default Register;