import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import api from "../../api/api";

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('user_token');
      const response = await api.get('/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, phone,address } = response.data.rescuer;
      setUser({ name, phone, location:address });
    } catch (err) {
      toast.error('Failed to load profile', err);
    }
  };
  // Simulate fetching user details
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserLayout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Welcome back,</h1>
          <p className="text-gray-600 mb-6">Choose a section from the sidebar to begin.</p>

          <div className="border-2 border-purple-400 p-6 rounded-md flex justify-between items-center">
            {/* User Info */}
            <div>
              <p className="text-purple-600 font-semibold">Name</p>
              <p className="mb-3">{user.name}</p>

              <p className="text-purple-600 font-semibold">Email</p>
              <p className="mb-3">{user.email}</p>

              <p className="text-purple-600 font-semibold">Phone</p>
              <p>{user.phone}</p>
            </div>

            {/* Location */}
            <div className="ml-10">
              <p className="text-purple-600 font-semibold">Location</p>
              <p>{user.location}</p>
            </div>

            {/* Request Rescue Button */}
            <div className="ml-10">
              <button className="border-2 border-purple-400 px-4 py-2 rounded-md text-purple-600 font-semibold hover:bg-purple-100 transition">
                Request Rescue
              </button>
            </div>
          </div>
        </>
      )}
    </UserLayout>
  );
};

export default UserDashboard;