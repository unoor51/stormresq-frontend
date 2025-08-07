import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import api from '../api/api';
import RescuerLayout from '../layouts/RescuerLayout';

const mapContainerStyle = {
  width: '100%',
  height: '80vh',
};

const defaultCenter = {
  lat: 31.582045, // Lahore, Pakistan
  lng: 74.329376,
};

const MapView = () => {
  const [evacuees, setEvacuees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rescuer, setRescuer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('rescue_token');

        // Fetch profile first to get rescuer location
        const profileResponse = await api.get('/rescuer/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const rescuerData = profileResponse.data.rescuer;
        setRescuer(rescuerData);

        // Then fetch evacuees nearby using rescuer location
        const evacueesResponse = await api.get('/rescuer/nearby-rescuees', {
          params: { lat: rescuerData.latitude, lng: rescuerData.longitude },
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvacuees(evacueesResponse.data.rescuees);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const rescuerLat = parseFloat(rescuer?.latitude);
  const rescuerLng = parseFloat(rescuer?.longitude);
  const mapCenter =
    rescuerLat && rescuerLng ? { lat: rescuerLat, lng: rescuerLng } : defaultCenter;

  return (
    <RescuerLayout>
      <h1 className="text-2xl font-bold mb-4 px-4">Evacuee Map</h1>

      <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10}>
        {/* Rescuer Marker */}
        {rescuerLat && rescuerLng && (
          <Marker
            position={{ lat: rescuerLat, lng: rescuerLng }}
            label="You"
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}

        {/* Evacuees */}
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

        {/* Info Window */}
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