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
        <div className="lg:col-span-2">
          <MapComponent
            houses={featuredHouses}
            onHouseSelect={handleHouseSelect}
            selectedHouse={selectedHouse}
            height="500px"
          />
        </div>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHouses.map(house => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;