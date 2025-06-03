import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HouseCard from '../components/HouseCard';
import Button from '../components/Button';
import Input from '../components/Input';
import MapComponent from '../components/MapComponent';
import { mockHouses } from '../data/houses';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedHouse, setSelectedHouse] = useState(null);
  const navigate = useNavigate();

  // Get featured houses (first 6 available houses)
  const featuredHouses = mockHouses.filter(house => house.available).slice(0, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('keywords', searchTerm);
    if (location) searchParams.set('location', location);
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleHouseSelect = (house) => {
    setSelectedHouse(house);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[calc(100vh-4rem)] bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Find Your Dream Home</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Search through thousands of listings to find the perfect place to call home. Your next adventure starts here.</p>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                type="text" 
                placeholder="Keywords (e.g. 3 bedroom, pool, pet-friendly)" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-text-main placeholder-text-muted focus:bg-white flex-1"
              />
              <Input 
                type="text" 
                placeholder="Location (e.g. Miami, Austin, 90210)" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white text-text-main placeholder-text-muted focus:bg-white flex-1"
              />
              <Button type="submit" variant="secondary" className="md:px-10 whitespace-nowrap">
                Search Now
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => navigate('/search')}
                className="text-text-main hover:text-primary"
                size="sm"
              >
                Advanced Search & Filters
              </Button>
            </div>
          </form>
        </div>
      </section>

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

      {/* Featured Listings Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-main mb-4">Featured Listings</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Handpicked properties that offer the best value and amenities. These homes won't stay on the market for long!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHouses.map(house => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              onClick={() => navigate('/search')}
              size="lg"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{mockHouses.length}+</div>
              <div className="text-text-muted">Properties Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-text-muted">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-text-muted">Happy Tenants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-text-muted">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;