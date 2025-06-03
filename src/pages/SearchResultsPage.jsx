import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import SearchFilters from '../components/SearchFilters';
import MapComponent from '../components/MapComponent';
import Button from '../components/Button';
import { mockHouses, priceRanges } from '../data/houses';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('price-low');

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    keywords: searchParams.get('keywords') || '',
    propertyType: 'All Types',
    priceRange: '0',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    filterHouses();
  }, [filters, sortBy]);

  const filterHouses = () => {
    let filtered = mockHouses.filter(house => house.available);

    // Location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(house => 
        house.city.toLowerCase().includes(locationLower) ||
        house.state.toLowerCase().includes(locationLower) ||
        house.zipCode.includes(filters.location) ||
        house.address.toLowerCase().includes(locationLower)
      );
    }

    // Keywords filter
    if (filters.keywords) {
      const keywordsLower = filters.keywords.toLowerCase();
      filtered = filtered.filter(house => 
        house.description.toLowerCase().includes(keywordsLower) ||
        house.amenities.some(amenity => amenity.toLowerCase().includes(keywordsLower)) ||
        house.type.toLowerCase().includes(keywordsLower)
      );
    }

    // Property type filter
    if (filters.propertyType && filters.propertyType !== 'All Types') {
      filtered = filtered.filter(house => house.type === filters.propertyType);
    }

    // Price range filter
    if (filters.priceRange !== '0') {
      const range = priceRanges[parseInt(filters.priceRange)];
      filtered = filtered.filter(house => 
        house.price >= range.min && house.price <= range.max
      );
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(house => house.bedrooms >= parseInt(filters.bedrooms));
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(house => house.bathrooms >= parseInt(filters.bathrooms));
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'bedrooms':
          return b.bedrooms - a.bedrooms;
        case 'area':
          return b.area - a.area;
        case 'newest':
          return new Date(b.datePosted) - new Date(a.datePosted);
        default:
          return 0;
      }
    });

    setFilteredHouses(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.keywords) params.set('keywords', newFilters.keywords);
    setSearchParams(params);
  };

  const handleReset = () => {
    const resetFilters = {
      location: '',
      keywords: '',
      propertyType: 'All Types',
      priceRange: '0',
      bedrooms: '',
      bathrooms: ''
    };
    setFilters(resetFilters);
    setSearchParams({});
  };

  const handleHouseSelect = (house) => {
    setSelectedHouse(house);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-main mb-2">Search Results</h1>
        <p className="text-text-muted">
          Found {filteredHouses.length} properties
          {filters.location && ` in ${filters.location}`}
          {filters.keywords && ` matching "${filters.keywords}"`}
        </p>
      </div>

      <SearchFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={filterHouses}
        onReset={handleReset}
      />

      <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-text-muted">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="bedrooms">Most Bedrooms</option>
            <option value="area">Largest Area</option>
            <option value="newest">Newest Listed</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            variant={!showMap ? 'primary' : 'outline'}
            onClick={() => setShowMap(false)}
            size="sm"
          >
            List View
          </Button>
          <Button
            variant={showMap ? 'primary' : 'outline'}
            onClick={() => setShowMap(true)}
            size="sm"
          >
            Map View
          </Button>
        </div>
      </div>

      {filteredHouses.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-text-main mb-2">No properties found</h3>
          <p className="text-text-muted mb-6">Try adjusting your search criteria or browse all available properties.</p>
          <Button onClick={handleReset} variant="primary">
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="mt-8">
          {showMap ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <MapComponent 
                  houses={filteredHouses} 
                  onHouseSelect={handleHouseSelect}
                  selectedHouse={selectedHouse}
                  height="600px"
                />
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg h-[600px] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-text-main mb-4">
                    Properties ({filteredHouses.length})
                  </h3>
                  <div className="space-y-4">
                    {filteredHouses.map(house => (
                      <div 
                        key={house.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedHouse?.id === house.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => handleHouseSelect(house)}
                      >
                        <div className="flex space-x-3">
                          <img 
                            src={house.images?.[0] || '/placeholder.svg?width=80&height=60&text=House'} 
                            alt={house.address}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{house.address}</h4>
                            <p className="text-xs text-text-muted">{house.city}, {house.state}</p>
                            <p className="text-sm font-bold text-primary">${house.price.toLocaleString()}/mo</p>
                            <div className="text-xs text-text-muted">
                              {house.bedrooms} bed • {house.bathrooms} bath
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHouses.map(house => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;