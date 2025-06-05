import { useEffect, useState } from 'react';
import Button from './Button';
import { getAllCategories } from '../apis/categoryApi';
import { priceRanges } from '../data/houses';

const SearchFilters = ({ filters, onFilterChange, onReset }) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-text-main mb-4">Search Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
          <select
            value={filters.categoryId || ''}
            onChange={(e) => handleInputChange('categoryId', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Price Range</label>
          <select
            value={filters.priceRange || ''}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Any</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Bedrooms</label>
          <select
            value={filters.bedroom || ''}
            onChange={(e) => handleInputChange('bedroom', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Location (Coordinates) */}
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-text-muted mb-1">Location (Click on Map to Pin)</label>
          <input
            type="text"
            readOnly
            value={filters.location || ''}
            placeholder="Latitude,Longitude"
            className="w-full px-3 py-2 border border-border rounded-md bg-gray-100 text-gray-600"
          />
          <p className="text-xs mt-1 text-text-muted">This will update when you click on the map.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onReset} variant="outline" className="flex-1 sm:flex-none">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;