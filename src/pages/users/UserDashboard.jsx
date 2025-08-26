import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    pets: 0,
    disabled: 0,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user_token");
      const response = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { name, email, phone, address, pets, disabled } = response.data.rescuer;
      setUser({ name, email, phone, location: address, pets, disabled });
    } catch (err) {
      toast.error("Failed to load profile");
    } finally{
      setLoading(false);
    }
  };

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

          <div className="border-2 border-orange-500 p-6 rounded-md flex justify-between items-center">
            {/* User Info */}
            <div>
              <p className="text-orange-600 font-semibold">Name</p>
              <p className="mb-3">{user.name}</p>

              <p className="text-orange-600 font-semibold">Email</p>
              <p className="mb-3">{user.email}</p>

              <p className="text-orange-600 font-semibold">Phone</p>
              <p>{user.phone}</p>
            </div>

            {/* Location & Extra Info */}
            <div className="ml-10">
              <p className="text-orange-600 font-semibold">Location</p>
              <p className="mb-3">{user.location}</p>

              <p className="text-orange-600 font-semibold">Pets</p>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  user.pets ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {user.pets ? "Yes" : "No"}
              </span>

              <p className="text-orange-600 font-semibold mt-3">Disabled</p>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                  user.disabled ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {user.disabled ? "Yes" : "No"}
              </span>
            </div>

            {/* Request Rescue Button */}
            <div className="ml-10">
              <button 
              onClick={() => navigate("/user/rescuee_request")}
              className="border-2 border-orange-500 px-4 py-2 rounded-md text-orange-600 font-semibold hover:bg-orange-100 transition">
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