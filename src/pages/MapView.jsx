import React from 'react';
import RescuerLayout from '../layouts/RescuerLayout';

const MapView = () => {
  return (
    <RescuerLayout>
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Rescue Requests Map</h1>
                <div className="w-full h-[500px] bg-white border rounded-md shadow">
                {/* Google Maps placeholder */}
                <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyDJYH_x63Kt40v5kJKULx2P1JWbNNK0aUw&center=27.9506,-82.4572&zoom=10`}>
                </iframe>
                </div>
            </div>
        </div>
    </RescuerLayout>
  );
};

export default MapView;
