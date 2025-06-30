import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import api from '../api/api';
import RescuerLayout from '../layouts/RescuerLayout';

const mapContainerStyle = {
  width: '100%',
  height: '80vh',
};

const defaultCenter = {
  lat: 39.8283, // Center of USA
  lng: -98.5795,
};

const MapView = () => {
  const [evacuees, setEvacuees] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchEvacuees = async () => {
      try {
        const token = localStorage.getItem('rescue_token');
        const response = await api.get('/rescuer/all-evacuees', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvacuees(response.data.evacuees);
      } catch (error) {
        console.error('Failed to fetch evacuees:', error);
      }
    };

    fetchEvacuees();
  }, []);

  return (
    <RescuerLayout>
      <h1 className="text-2xl font-bold mb-4 px-4">Evacuee Map</h1>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={6}
      >
        {evacuees.map((evacuee) => (
          <Marker
            key={evacuee.id}
            position={{
              lat: parseFloat(evacuee.latitude),
              lng: parseFloat(evacuee.longitude),
            }}
            onClick={() => setSelected(evacuee)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: parseFloat(selected.latitude),
              lng: parseFloat(selected.longitude),
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <p className="font-bold mb-1">📞 {selected.phone}</p>
              <p>{selected.situation}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </RescuerLayout>
  );
};

export default MapView;