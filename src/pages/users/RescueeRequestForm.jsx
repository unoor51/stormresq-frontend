import React, { useState, useEffect } from "react";
import UserLayout from "../../layouts/UserLayout";
import { toast } from "react-toastify";
import api from "../../api/api";
import { FaPaw, FaWheelchair } from "react-icons/fa";
import LocationInput from "../../components/LocationInput";

const RescueeRequestForm = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    people_count: 1,
    needsPet: 0,
    needsDisabled: 0,
    latitude: "",
    longitude: "",
    situation:"",
  });
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { email, phone, address, pets, disabled } = response.data.rescuer;
        setForm((prev) => ({
          ...prev,
          email,
          phone,
          needsPet:pets,
          needsDisabled:disabled,
        }));
        setAddress(address);
      } catch (err) {
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("user_token");
      await api.post("/evacuees", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Rescue request submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit rescue request.");
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-md">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">Request Rescue</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold">People Count</label>
            <input
              type="number"
              name="people_count"
              value={form.people_count}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
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

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default RescueeRequestForm;