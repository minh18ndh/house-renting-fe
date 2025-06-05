import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import SearchFilters from '../components/SearchFilters';
import Button from '../components/Button';
import { getAllPosts } from '../apis/postApi';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    categoryId: searchParams.get('categoryId') || '',
    priceRange: searchParams.get('priceRange') || '',
    bedroom: searchParams.get('bedroom') || '',
  });

  // Auto-fetch on filter change
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const data = await getAllPosts({
          ...(filters.categoryId && { categoryId: filters.categoryId }),
          ...(filters.location && { location: filters.location }),
          ...(filters.priceRange && { priceRange: filters.priceRange }),
          ...(filters.bedroom && { bedroom: filters.bedroom }),
        });

        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchFilteredPosts();

    // Update searchParams in URL
    const params = new URLSearchParams();
    if (filters.categoryId) params.set('categoryId', filters.categoryId);
    if (filters.location) params.set('location', filters.location);
    if (filters.priceRange) params.set('priceRange', filters.priceRange);
    if (filters.bedroom) params.set('bedroom', filters.bedroom);
    setSearchParams(params);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      categoryId: '',
      location: '',
      priceRange: '',
      bedroom: '',
    };
    setFilters(resetFilters);
    setSearchParams({});
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main mb-2">Search Results</h1>
        <p className="text-sm md:text-base text-text-muted">
          Found {posts.length} properties
        </p>
      </div>

      <div className="mb-8">
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-lg md:text-xl font-semibold text-text-main mb-2">No properties found</h3>
          <p className="text-sm md:text-base text-text-muted mb-6">Try adjusting your search criteria or browse all available properties.</p>
          <Button onClick={handleReset} variant="primary">
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(house => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;