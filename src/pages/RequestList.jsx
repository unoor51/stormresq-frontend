import React from 'react';
import { FaPhoneAlt, FaPaw, FaWheelchair } from 'react-icons/fa';
import RescuerLayout from '../layouts/RescuerLayout';

const mockRequests = [
  {
    id: 1,
    phone: '(305) 555-1234',
    peopleCount: 3,
    situation: 'Stuck in attic with water rising.',
    needsPet: true,
    needsDisabled: false,
    time: '2 minutes ago',
  },
  {
    id: 2,
    phone: '(407) 555-7890',
    peopleCount: 1,
    situation: 'Elderly person needs help evacuating.',
    needsPet: false,
    needsDisabled: true,
    time: '5 minutes ago',
  },
];

const RequestList = () => {
  return (
    <RescuerLayout>
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Evacuation Requests</h1>

                {mockRequests.map((req) => (
                <div key={req.id} className="bg-white rounded-lg shadow p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{req.time}</span>
                    <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-500">
                        Assign to Me
                    </button>
                    </div>

                    <div className="mb-2 text-sm flex items-center gap-2 text-blue-600">
                    <FaPhoneAlt className="text-gray-500" />
                    <a href={`tel:${req.phone}`}>{req.phone}</a>
                    </div>

                    <div className="text-sm mb-1"><strong>People:</strong> {req.peopleCount}</div>
                    <div className="text-sm mb-1"><strong>Situation:</strong> {req.situation}</div>

                    <div className="flex gap-2 mt-2">
                    {req.needsPet && (
                        <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                        <FaPaw className="mr-1" /> Pet
                        </span>
                    )}
                    {req.needsDisabled && (
                        <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                        <FaWheelchair className="mr-1" /> Disabled
                        </span>
                    )}
                    </div>
                </div>
                ))}
            </div>
        </div>
    </RescuerLayout>
  );
};

export default RequestList;
