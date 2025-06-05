import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [21.0278, 105.8342]; // Hanoi

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

const MapPicker = ({ value, onChange, height = '400px' }) => {
    const [position, setPosition] = useState(
        value ? value.split(',').map(Number) : null
    );

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                const coords = [lat, lng];
                setPosition(coords);
                onChange(`${lat.toFixed(6)},${lng.toFixed(6)}`);
            },
        });
        return null;
    };

    return (
        <div style={{ height }} className="rounded-lg overflow-hidden shadow">
            <MapContainer
                center={position || defaultCenter}
                zoom={13}
                scrollWheelZoom
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler />
                {position && <Marker position={position} icon={customIcon} />}
            </MapContainer>
        </div>
    );
};

export default MapPicker;