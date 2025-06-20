import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaPaw, FaWheelchair } from 'react-icons/fa';
import api from '../api/api';

const EvacueeForm = () => {
  const [form, setForm] = useState({
    phone: '',
    peopleCount: '',
    situation: '',
    needsPet: false,
    needsDisabled: false,
    acceptedTerms: false,
    latitude: null,
    longitude: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleNeed = (field) => {
    setForm({ ...form, [field]: !form[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.acceptedTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    try {
      const response = await api.post('/evacuees', {
        phone: form.phone,
        peopleCount: parseInt(form.peopleCount),
        situation: form.situation,
        needsPet: form.needsPet,
        needsDisabled: form.needsDisabled,
        latitude: form.latitude,
        longitude: form.longitude,
      });

      console.log('Form submitted:', response.data);
      alert('Request submitted successfully!');
      setForm({
        phone: '',
        peopleCount: '',
        situation: '',
        needsPet: false,
        needsDisabled: false,
        acceptedTerms: false,
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
        }
      );
    } else {
      console.warn('Geolocation not available');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20">
      {/* Orange Top Tab Navigation */}
      <div class="w-full max-w-md px-4">
        <div className="flex justify-around">
          <Link to="/rescuer/login" className="text-gray-600 font-semibold hover:text-orange-600 hover:border-b-2 hover:border-orange-500">Rescuer Login</Link>
          <Link to="/rescuer/signup" className="text-gray-600 font-semibold hover:text-orange-600 hover:border-b-2 hover:border-orange-500">Rescuer Signup</Link>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Get Evacuation Help</h2>
        <p className="text-center text-blue-600 text-sm mb-4">
          <a href="#" className="underline">899 Water St, Tampa, FL 33602, USA</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Phone Number*</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaPhoneAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                name="phone"
                placeholder="(614) 578-5994"
                value={form.phone}
                onChange={handleChange}
                className="flex-1 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">People Count*</label>
            <input
              type="number"
              name="peopleCount"
              placeholder="4"
              value={form.peopleCount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Situation*</label>
            <textarea
              name="situation"
              placeholder="We’re on our roof."
              value={form.situation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Additional Needs</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => toggleNeed('needsPet')}
                className={`flex items-center gap-1 px-4 py-2 border rounded-md ${form.needsPet ? 'bg-orange-100 border-orange-500' : ''}`}
              >
                <FaPaw /> Pet
              </button>
              <button
                type="button"
                onClick={() => toggleNeed('needsDisabled')}
                className={`flex items-center gap-1 px-4 py-2 border rounded-md ${form.needsDisabled ? 'bg-orange-100 border-orange-500' : ''}`}
              >
                <FaWheelchair /> Disabled
              </button>
            </div>
          </div>

          <div className="flex items-start text-sm mt-2">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={form.acceptedTerms}
              onChange={handleChange}
              className="mr-2 mt-1"
            />
            <span>
              FloridaHelp.Live is volunteer-run. By continuing, you accept our{' '}
              <a href="#" className="text-blue-600 underline">Terms & Conditions</a>.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default EvacueeForm;