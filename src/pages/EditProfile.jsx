import React, { useEffect, useState } from 'react';
import RescuerLayout from '../layouts/RescuerLayout';
import api from '../api/api';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('rescue_token');
        const response = await api.get('/rescuer/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { first_name, last_name, phone } = response.data.rescuer;
        setForm({ first_name, last_name, phone, password: '' });
      } catch (err) {
        toast.error('Failed to load profile', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('rescue_token');
      await api.put('/rescuer/profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RescuerLayout>
      <div className="max-w-xl mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Password (leave blank to keep unchanged)</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </RescuerLayout>
  );
};

export default EditProfile;