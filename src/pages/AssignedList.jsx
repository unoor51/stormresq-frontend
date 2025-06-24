import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaPaw, FaWheelchair, FaAddressBook } from 'react-icons/fa';
import RescuerLayout from '../layouts/RescuerLayout';
import api from '../api/api';

const AssignedList = () => {
  const [rescues, setRescues] = useState([]);

  const fetchAssignedRescues = async () => {
    try {
      const token = localStorage.getItem('rescue_token');
      const response = await api.get('/rescuer/assigned-rescues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRescues(response.data.rescues);
    } catch (error) {
      console.error('Failed to fetch assigned rescues:', error);
    }
  };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this assignment?')) return;

        try {
            await api.post(`/rescuer/cancel/${id}`, null, {
            headers: { Authorization: `Bearer ${localStorage.getItem('rescue_token')}` },
            });
            alert('Rescue canceled.');
            fetchAssignedRescues(); // refresh list
        } catch (err) {
            alert('Error canceling rescue');
        }
    };

    const handleComplete = async (id) => {
        if (!window.confirm('Mark this rescue as completed?')) return;

        try {
            await api.post(`/rescuer/complete/${id}`, null, {
            headers: { Authorization: `Bearer ${localStorage.getItem('rescue_token')}` },
            });
            alert('Rescue completed.');
            fetchAssignedRescues(); // refresh list
        } catch (err) {
            alert('Error completing rescue');
        }
    };

  useEffect(() => {
    fetchAssignedRescues();
  }, []);

  return (
    <RescuerLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Assigned Requests</h1>

          {rescues.length === 0 ? (
            <p>No assigned rescue requests yet.</p>
          ) : (
            rescues.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {new Date(req.created_at).toLocaleString()}
                  </span>
                  <div className="flex justify-center items-center">
                    <button  onClick={() => handleCancel(req.id)} className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded hover:bg-orange-500 hover:text-white mx-1">
                      Cancel
                    </button>
                    <button  onClick={() => handleComplete(req.id)} className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded hover:bg-orange-500 hover:text-white mx-1">
                      Complete
                    </button>
                    <button onClick={() => {
                            const url = `https://www.google.com/maps?q=${req.latitude},${req.longitude}`;
                            window.open(url, '_blank');
                        }}
                        className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded hover:bg-orange-500 hover:text-white mx-1">
                      Get Direction
                    </button>
                  </div>
                </div>

                <div className="mb-2 text-sm flex items-center gap-2 text-blue-600">
                  <FaPhoneAlt className="text-gray-500" />
                  <a href={`tel:${req.phone}`}>{req.phone}</a>
                </div>
                {req.address && (
                    <div className="mb-2 text-sm flex items-center gap-2 text-blue-600">
                        <FaAddressBook className="text-gray-500" />
                        {req.address}
                    </div>
                )}     
                <div className="text-sm mb-1"><strong>People:</strong> {req.people_count}</div>
                <div className="text-sm mb-1"><strong>Situation:</strong> {req.situation}</div>

                <div className="flex gap-2 mt-2">
                  {req.needs_pet === 1 && (
                    <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      <FaPaw className="mr-1" /> Pet
                    </span>
                  )}
                  {req.needs_disabled === 1 && (
                    <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      <FaWheelchair className="mr-1" /> Disabled
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </RescuerLayout>
  );
};

export default AssignedList;
