import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserLayout from '../../layouts/UserLayout';
import api from '../../api/api';
import LocationInput from '../../components/LocationInput';
import { FaPaw, FaWheelchair } from 'react-icons/fa';
import Loader from "../../components/Loader";

const UserEditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    people_count:1,
    latitude:'',
    longitude:'',
    pets:0,
    disabled:0,
    address:'',
  });
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
form.address = address;
  const toggleNeed = (field) => {
    setForm({ ...form, [field]: !form[field] });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('user_token');
        const response = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, phone, people_count,address,latitude,longitude, pets,disabled } = response.data.rescuer;
        setForm({ name, phone, password: '',people_count, latitude, longitude,pets,disabled });
        setAddress(address);
      } catch (err) {
        toast.error('Failed to load profile', err);
      }finally{
        setLoading(false);
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
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      {
      loading ? <Loader/> : (
        <div className="max-w-2xl mt-6">
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
              <label className="block font-semibold">People Count</label>
              <input
                type="text"
                name="people_count"
                value={form.people_count}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <LocationInput
                onAddressSelect={({ lat, lng, address }) => {
                  setForm((prev) => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                  }));
                  setAddress(address);
                }}
              />
              <p className="text-sm text-gray-500 my-3">{address}</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Additional Needs</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => toggleNeed('pets')}
                  className={`flex items-center gap-1 px-4 py-2 border rounded-md ${form.pets ? 'bg-orange-100 border-orange-500' : ''}`}
                >
                  <FaPaw /> Pet
                </button>
                <button
                  type="button"
                  onClick={() => toggleNeed('disabled')}
                  className={`flex items-center gap-1 px-4 py-2 border rounded-md ${form.disabled ? 'bg-orange-100 border-orange-500' : ''}`}
                >
                  <FaWheelchair /> Disabled
                </button>
              </div>
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
      )
      }
    </UserLayout>
  );
};

export default UserEditProfile;