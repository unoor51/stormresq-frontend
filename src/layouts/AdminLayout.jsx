import React, { useState } from 'react';
import { FaCheckCircle, FaCog, FaCogs, FaList, FaUser, FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-orange-600 text-white p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      {/* Sidebar */}
      <aside className={`fixed min-h-screen z-40 top-0 left-0 h-full w-64 custom-gray-bg text-white p-4 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block`}>
        <h1 className="text-2xl font-bold mb-8 pt-16 md:pt-0">StormResQ Admin</h1>
        <nav className="flex flex-col space-y-3">
          
            <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/dashboard' ? 'bg-orange-600 text-white' : ''}`}> <FaCog /> Dashboard</Link>
            <Link to="/admin/rescuers" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescuers' ? 'bg-orange-600 text-white' : ''}`}> <FaUsers /> Rescuers</Link>
            <Link to="/admin/rescues/available" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/available' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Available Rescues</Link>
            <Link to="/admin/rescues/assigned" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/assigned' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Assigned Rescues</Link>
            <Link to="/admin/rescues/completed" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/completed' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Completed Rescues</Link>
            <Link to="/admin/rescues/cancelled" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/rescues/cancelled' ? 'bg-orange-600 text-white' : ''}`}><FaCheckCircle /> Cancelled Rescues</Link>
            <Link to="/admin/settings" onClick={() => setSidebarOpen(false)} className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-600 ${location.pathname === '/admin/settings' ? 'bg-orange-600 text-white' : ''}`}><FaCogs /> Settings</Link>
          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 text-center bg-white text-orange-600 rounded-md hover:bg-orange-100 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto pt-16 md:pt-0">{children}</div>
    </div>
  );
};

export default AdminLayout;