import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in leaflet with bundlers
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to dynamically update map center
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const PincodeMap = ({ pincode }) => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default to India center
  const [zoom, setZoom] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      if (!pincode || pincode.length < 5) return;
      
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json`);
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon, display_name } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
          setZoom(13);
          setLocationName(display_name);
        } else {
          setError('Location not found for this pincode.');
        }
      } catch (err) {
        setError('Error fetching location.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timerId = setTimeout(() => {
      fetchLocation();
    }, 1000);

    return () => clearTimeout(timerId);
  }, [pincode]);

  return (
    <div className="w-full h-full flex flex-col relative rounded-[32px] overflow-hidden shadow-2xl z-10 bg-white">
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      )}
      <div className="h-full w-full relative z-0">
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%', minHeight: '400px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={position} zoom={zoom} />
          <Marker position={position}>
            <Popup>
              {locationName || 'Location'}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      {locationName && !loading && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-surface-variant shadow-lg z-10">
          <p className="text-sm text-on-surface-variant font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span className="truncate">{locationName}</span>
          </p>
        </div>
      )}
      {error && !loading && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-50/90 backdrop-blur-md p-3 rounded-xl border border-red-200 shadow-lg z-10">
           <p className="text-sm text-red-600 font-medium flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default PincodeMap;
