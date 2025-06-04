import { Link } from 'react-router-dom';
import Button from './Button';

const HouseCard = ({ house }) => {
  const { id, images, price, address, city, state, bedrooms, bathrooms, area, type } = house;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/house/${id}`}>
        <div className="relative">
          <img
            src={images?.[0] || `/placeholder.svg?width=400&height=250&text=House+Image`}
            alt={`${type} at ${address}`}
            className="w-full h-56 object-cover"
          />
          <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-md text-xs font-medium">
            {type}
          </div>
          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
            {images?.length || 1} Photos
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-main truncate">{address}</h3>
            <p className="text-sm text-text-muted">{city}, {state}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">${price.toLocaleString()}</p>
            <p className="text-xs text-text-muted">per month</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-text-muted mb-4 py-2 border-t border-gray-100">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {bedrooms} Beds
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
            </svg>
            {bathrooms} Baths
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
            {area} sqft
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