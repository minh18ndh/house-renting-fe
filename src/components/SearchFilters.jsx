import Button from './Button';
import { priceRanges, propertyTypes } from '../data/houses';

const SearchFilters = ({ filters, onFilterChange, onSearch, onReset }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-text-main mb-4">Search Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            {priceRanges.map((range, index) => (
              <option key={index} value={index}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-text-muted mb-1">Bedrooms</label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onSearch} variant="primary" className="flex-1">
          Search Properties
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1 sm:flex-none">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;