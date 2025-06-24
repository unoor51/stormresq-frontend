import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const LocationInput = ({ onAddressSelect }) => {
  const autocompleteRef = useRef(null);
  const [manualAddress, setManualAddress] = useState('');

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) {
      alert('Please select a location from the dropdown');
      return;
    }

    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();
    const address = place.formatted_address;

    // Update form state and input value
    onAddressSelect({ lat, lng, address });
    setManualAddress(address);
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        value={manualAddress}
        onChange={(e) => setManualAddress(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        placeholder="Search address manually"
      />
    </Autocomplete>
  );
};

export default LocationInput;