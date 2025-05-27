import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng); // { lat, lng }
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className="w-full h-64 border rounded overflow-hidden mb-4">
      <MapContainer center={[0, 0]} zoom={2} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};
