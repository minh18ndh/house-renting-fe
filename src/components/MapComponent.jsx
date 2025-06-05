import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    background-color: #12A89E;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 12px;
  ">$</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const MapComponent = ({ location = '21.0285,105.8542', title = 'Property Location', height = '400px' }) => {
  const coordinates = location.split(',').map(Number); // [lat, lng]

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow">
      <MapContainer
        center={coordinates}
        zoom={14}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} icon={customIcon}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;