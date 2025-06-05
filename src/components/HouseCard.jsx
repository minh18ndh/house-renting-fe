import { Link } from 'react-router-dom';
import Button from './Button';
import { STATIC_URL } from '../apis/apiFetch';

const HouseCard = ({ house }) => {
  const { id, price, address, bedroom, area, type } = house;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/house/${id}`}>
        <div className="relative">
          <img
            src={`${STATIC_URL}/${house.images[0]?.baseUrl}` || `/placeholder.svg?width=400&height=250&text=House+Image`}
            alt={`${type} at ${address}`}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-md text-xs font-medium">
            {type}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex flex-col gap-2 mb-2">
          <div>
            <h3 className="text-lg font-semibold text-text-main">{address}</h3>
          </div>

          <div>
            <p className="text-xl font-bold text-primary">${price.toLocaleString()}</p>
            <p className="text-xs text-text-muted">per month</p>
            {house.distance !== undefined && (
              <p className="text-sm text-text-muted mt-1">
                📍 {house.distance.toFixed(1)} km from pinned location
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-text-muted mb-4 py-2 border-t border-gray-100">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {bedroom} Beds
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
            {area} m²
          </span>
        </div>

        <Link to={`/house/${id}`}>
          <Button variant="primary" className="w-full" size="sm">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default HouseCard;