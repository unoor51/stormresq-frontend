import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserLayout from '../../layouts/UserLayout';
import api from '../../api/api';

const UserEditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('user_token');
        const response = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, phone } = response.data.rescuer;
        setForm({ name, phone, password: '' });
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
      const token = localStorage.getItem('user_token');
      await api.put('/user/profile', form, {
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
    <UserLayout>
      <div className="max-w-xl mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
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
    </UserLayout>
  );
};

export default UserEditProfile;