import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaPaw, FaWheelchair } from 'react-icons/fa';
import api from '../api/api';
import LocationInput from './LocationInput';
import Modal from './Modal';

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
    requestFor: 'myself',
  });

  const [useManualAddress, setUseManualAddress] = useState(false);
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

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
        address: address,
        request_for: form.requestFor
      });

      setShowModal(true);

      setForm({
        phone: '',
        peopleCount: '',
        situation: '',
        needsPet: false,
        needsDisabled: false,
        acceptedTerms: false,
        latitude: null,
        longitude: null,
        requestFor: 'myself',
      });

    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const getAddressFromCoords = async (lat, lng) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return 'Error retrieving address';
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        setForm((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        const address = await getAddressFromCoords(latitude, longitude);
        setAddress(address);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-white flex flex-col items-center justify-start pt-20">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Get Evacuation Help</h2>

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={useManualAddress}
            onChange={() => setUseManualAddress(!useManualAddress)}
          />
          <span><b>Enter address manually</b></span>
        </label>

        {useManualAddress && (
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
        )}

        <p className="text-sm text-gray-500 my-3">{address}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Phone Number*</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaPhoneAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                name="phone"
                placeholder="1 (813) 485-6949"
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

          <div className="my-2">
            <label className="block font-semibold mb-2">Are you requesting help for:</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="requestFor"
                  value="myself"
                  checked={form.requestFor === 'myself'}
                  onChange={handleChange}
                  className="mr-2"
                />
                For Myself
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="requestFor"
                  value="someone"
                  checked={form.requestFor === 'someone'}
                  onChange={handleChange}
                  className="mr-2"
                />
                On Someone’s Behalf
              </label>
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

          <div className="flex items-start text-sm mt-2">
            <span>
              If you are a rescuer, please login <Link to="/rescuer/login" className="text-orange-500 underline font-semibold hover:text-orange-600 hover:border-b-2 hover:border-orange-500">Here</Link>.
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

      {/* Modal appears here after submission */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message="You are now in queue & as soon as a rescuer is available, you will receive a message."
        title="Request Submitted"
      />
    </div>
  );
};

export default EvacueeForm;