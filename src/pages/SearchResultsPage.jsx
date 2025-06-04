import { useState, useEffect } from 'react';
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
  const featuredHouses = mockHouses.filter(house => house.available).slice(0, 6);

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

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-main mb-4">Explore Properties on Map</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Discover properties in your preferred locations. Click on any marker to see property details and get a better sense of the neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MapComponent
                houses={featuredHouses}
                onHouseSelect={handleHouseSelect}
                selectedHouse={selectedHouse}
                height="500px"
              />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] overflow-y-auto">
                <h3 className="text-xl font-semibold text-text-main mb-4">Featured Properties</h3>
                <div className="space-y-4">
                  {featuredHouses.map(house => (
                    <div
                      key={house.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedHouse?.id === house.id
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedHouse?.id === house.id
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