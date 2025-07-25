import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaCog,
  FaMapMarkedAlt,
  FaClipboardList,
  FaCheckCircle,
  FaUserAlt
} from 'react-icons/fa';
import api from '../api/api';

const navLinks = [
  { label: 'Dashboard', path: '/rescuer/dashboard', icon: <FaCog /> },
  { label: 'Rescues Map', path: '/rescuer/map', icon: <FaMapMarkedAlt /> },
  { label: 'Available Rescues', path: '/rescuer/requests', icon: <FaClipboardList /> },
  { label: 'Assigned Rescues', path: '/rescuer/assigned', icon: <FaCheckCircle /> },
  { label: 'Completed Rescues', path: '/rescuer/completed-rescues', icon: <FaCheckCircle /> },
  { label: 'Cancelled Rescues', path: '/rescuer/cancelled-rescues', icon: <FaCheckCircle /> },
  { label: 'Edit Profile', path: '/rescuer/edit-profile', icon: <FaUserAlt /> },
];

const RescuerLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post('/rescuer/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('rescue_token')}`,
        },
      });

      localStorage.removeItem('rescue_token');
      navigate('/rescuer/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Try again.');
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-orange-600 text-white p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      {/* Sidebar */}
      <div
        className={`fixed min-h-screen z-40 top-0 left-0 h-full w-64 bg-orange-500 text-white p-4 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-2xl font-bold mb-8 pt-16 md:pt-0">StormResQ</h1>
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${
                location.pathname === link.path ? 'bg-orange-600' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 text-center bg-white text-orange-600 rounded-md hover:bg-orange-100 transition"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 pt-16 md:pt-6 overflow-y-auto bg-gradient-to-b from-orange-200 to-white">
        {children}
      </div>
    </div>
  );
};

export default RescuerLayout;