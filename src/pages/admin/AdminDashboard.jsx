import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    evacuees: 0,
    rescuers: 0,
    active_rescues: 0,
    pendingRescuer: 0,
    rejectedRescuer: 0,
    approvedRescuer: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await api.get('/admin/dashboard-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome to the StormResQ admin panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Evacuees</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.evacuees}</p> {/* We'll make this dynamic later */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Total Rescuers</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.rescuers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Active Rescues</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.active_rescues}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Approved Rescuers</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.approvedRescuer}</p> {/* We'll make this dynamic later */}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Pending Rescuers</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.pendingRescuer}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Rejected Rescuers</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.rejectedRescuer}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;