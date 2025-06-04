import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ houses, onHouseSelect, selectedHouse, height = '400px' }) => {
  const [map, setMap] = useState(null);

  // Default center (USA)
  const defaultCenter = [39.8283, -98.5795];
  const defaultZoom = 4;

  useEffect(() => {
    if (map && houses.length > 0) {
      const group = new L.featureGroup(houses.map(house =>
        L.marker(house.coordinates)
      ));
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [map, houses]);

  const createCustomIcon = (isSelected) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${isSelected ? '#F2792A' : '#12A89E'};
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
  };

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={houses.length > 0 ? houses[0].coordinates : defaultCenter}
        zoom={houses.length > 0 ? 10 : defaultZoom}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {houses.map((house) => (
          <Marker
            key={house.id}
            position={house.coordinates}
            icon={createCustomIcon(selectedHouse?.id === house.id)}
            eventHandlers={{
              click: () => onHouseSelect && onHouseSelect(house),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <img
                  src={house.images?.[0] || '/placeholder.svg?width=200&height=120&text=House'}
                  alt={house.address}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-sm">{house.address}</h4>
                <p className="text-xs text-gray-600">{house.city}, {house.state}</p>
                <p className="text-lg font-bold text-primary">${house.price.toLocaleString()}/mo</p>
                <div className="text-xs text-gray-600 mt-1">
                  {house.bedrooms} bed • {house.bathrooms} bath • {house.area} sqft
                </div>
                <button
                  onClick={() => window.open(`/house/${house.id}`, '_blank')}
                  className="mt-2 bg-primary text-white px-3 py-1 rounded text-xs hover:bg-opacity-90 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;