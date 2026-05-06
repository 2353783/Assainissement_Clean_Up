import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition, readonly }) {
  const map = useMapEvents({
    click(e) {
      if (!readonly) {
        setPosition(e.latlng);
      }
    },
  });

  useEffect(() => {
    if (position && map) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function MapComponent({ onLocationSelect, currentPosition, readonly = false, markers = [] }) {
  // Default to Kinshasa coordinates: -4.4419, 15.2663
  const defaultPosition = { lat: -4.4419, lng: 15.2663 };
  const [position, setPosition] = useState(currentPosition || null);

  useEffect(() => {
    if (currentPosition) {
      setPosition(currentPosition);
    }
  }, [currentPosition]);

  useEffect(() => {
    if (position && onLocationSelect && !readonly) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect, readonly]);

  return (
    <div className="map-container" style={{ border: '1px solid var(--glass-border)' }}>
      <MapContainer 
        center={defaultPosition} 
        zoom={readonly ? 13 : 12} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.length > 0 ? (
          markers.map((m, idx) => (
            <Marker key={idx} position={{ lat: m.lat, lng: m.lng }} />
          ))
        ) : (
          <LocationMarker position={position} setPosition={setPosition} readonly={readonly} />
        )}
      </MapContainer>
    </div>
  );
}
