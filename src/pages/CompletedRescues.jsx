import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaPaw, FaWheelchair, FaAddressBook } from 'react-icons/fa';
import RescuerLayout from '../layouts/RescuerLayout';
import api from '../api/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const CompletedRescues = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCompletedRescues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('rescue_token');
      const response = await api.get('/rescuer/completed-rescues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRescues(response.data.rescues);
    } catch (error) {
      toast.error('Failed to fetch rescues.');
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedRescues();
  }, []);

  return (
    <RescuerLayout>
      <div className="min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Completed Rescues</h1>
        {
          loading ? <Loader/> :
          (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rescues.length === 0 ? (
            <p>No completed rescue requests right now.</p>
          ) : (
            rescues.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow p-4 mb-4 bordered-orange">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {new Date(req.created_at).toLocaleString()}
                  </span>
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
                
                <div className="text-sm mb-1">
                  <strong>People:</strong> {req.people_count}
                </div>
                <div className="text-sm mb-1">
                  <strong>Situation:</strong> {req.situation}
                </div>

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
          )
        }
      </div>
    </RescuerLayout>
  );
};

export default CompletedRescues;