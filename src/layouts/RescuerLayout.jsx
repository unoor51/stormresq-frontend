import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCog, FaMapMarkedAlt, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const navLinks = [
  { label: 'Dashboard', path: '/rescuer/dashboard', icon: <FaCog /> },
  { label: 'Rescues Map', path: '/rescuer/map', icon: <FaMapMarkedAlt /> },
  { label: 'Available Rescues', path: '/rescuer/requests', icon: <FaClipboardList /> },
  { label: 'Assigned Rescues', path: '/rescuer/assigned', icon: <FaCheckCircle /> },
];

const RescuerLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-64 bg-orange-500 text-white p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">StormResQ</h1>
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${
                location.pathname === link.path ? 'bg-orange-600' : ''
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Logout Button */}
        <div className="mt-auto">
        <button
            onClick={() => {
            // Clear session/token (customize this logic)
            localStorage.removeItem('rescue_token');
            window.location.href = '/rescuer/login';
            }}
            className="w-full mt-6 py-2 text-center bg-white text-orange-600 rounded-md hover:bg-orange-100 transition"
        >
            Logout
        </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto bg-gradient-to-b from-orange-200 to-white">
        {children}
      </div>
    </div>
  );
};

export default RescuerLayout;