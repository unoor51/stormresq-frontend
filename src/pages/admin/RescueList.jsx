import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Loader from '../../components/Loader';

const RescueList = ({ status }) => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const fetchRescues = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await api.get(`/admin/rescues?status=${status}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRescues(response.data.rescues);
      } catch (error) {
        console.error('Failed to fetch rescues:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchRescues();
  }, [status]);
    
  if (loading) return <Loader />;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 capitalize">{status} Rescues</h2>

      {rescues.length === 0 ? (
        <p className="text-sm text-gray-600">No rescues found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-gray-100 text-sm text-left">
              <tr>
                <th className="p-3">Phone</th>
                <th className="p-3">People</th>
                <th className="p-3">Situation</th>
                <th className="p-3">Status</th>
                <th className="p-3">Requested</th>
              </tr>
            </thead>
            <tbody>
              {rescues.map((r) => (
                <tr key={r.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="p-3">{r.phone}</td>
                  <td className="p-3">{r.people_count}</td>
                  <td className="p-3">{r.situation}</td>
                  <td className="p-3 capitalize">{r.status || 'Available'}</td>
                  <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RescueList;