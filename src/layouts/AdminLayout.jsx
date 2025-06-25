import React from 'react';
import { FaCheckCircle, FaCog, FaList, FaUser, FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">StormResQ Admin</h1>
        <nav className="flex flex-col space-y-3">
          
            <Link to="/admin/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/dashboard' ? 'bg-orange-600 text-white' : ''}`}> <FaCog /> Dashboard</Link>
            <Link to="/admin/rescuers" className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescuers' ? 'bg-orange-600 text-white' : ''}`}> <FaUsers /> Rescuers</Link>
            <Link to="/admin/rescues/available" className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/available' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Available Rescues</Link>
            <Link to="/admin/rescues/assigned" className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/assigned' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Assigned Rescues</Link>
            <Link to="/admin/rescues/completed" className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/completed' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Completed Rescues</Link>
            <Link to="/admin/rescues/cancelled" className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/cancelled' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Cancelled Rescues</Link>
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 text-center bg-white text-orange-600 rounded-md hover:bg-orange-100 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto bg-gradient-to-b from-orange-200 to-white">{children}</div>
    </div>
  );
};

export default AdminLayout;