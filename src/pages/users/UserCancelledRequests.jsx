import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import UserLayout from '../../layouts/UserLayout';

const UserCancelledRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('user_token'); // Make sure this matches your login storage
        const response = await api.get('/user/my-requests?status=cancelled', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data.requests);
      } catch (error) {
        toast.error('Error fetching requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6">Cancelled Requests</h1>
      {loading ? (
        <Loader />
      ) : requests.length === 0 ? (
        <p>No completed requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded border">
            <thead className="bg-gray-100 text-sm text-left">
              <tr className='table-header'>
                <th className="p-3">Phone</th>
                <th className="p-3">People Count</th>
                <th className="p-3">Situation</th>
                <th className="p-3">Pets</th>
                <th className="p-3">Disabled</th>
                <th className="p-3">Address</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="p-3">{req.phone}</td>
                  <td className="p-3">{req.people_count}</td>
                  <td className="p-3">{req.situation}</td>
                  <td className="p-3">
                    <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        req.needs_pet ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {req.needs_pet ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        req.needs_disabled ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {req.needs_disabled ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-3">{req.address}</td>
                  <td className="p-3">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </UserLayout>
  );
};

export default UserCancelledRequests;