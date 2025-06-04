import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mockHouses } from '../data/houses';

const MyListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - get user's listings
    setTimeout(() => {
      const userListings = mockHouses.filter(house => [101, 102].includes(house.id));
      setListings(userListings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteListing = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(listing => listing.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, available: !listing.available }
        : listing
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">Loading your listings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main">My Listings</h1>
          <p className="text-text-muted mt-1">Manage your property listings</p>
        </div>
        <Button onClick={() => alert('Add new listing feature coming soon!')}>
          + Add New Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-text-main mb-2">No listings yet</h3>
          <p className="text-text-muted mb-6 max-w-md mx-auto">
            Start earning by listing your property. It's easy and takes just a few minutes.
          </p>
          <Button variant="primary" onClick={() => alert('Add new listing feature coming soon!')}>
            Create Your First Listing
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden lg:block bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={listing.images?.[0] || '/placeholder.svg?width=60&height=40&text=House'} 
                          alt={listing.address}
                          className="w-16 h-12 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-text-main">{listing.address}</div>
                          <div className="text-sm text-text-muted">{listing.type} • {listing.bedrooms} bed • {listing.bathrooms} bath</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                      {listing.city}, {listing.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-main">
                      ${listing.price.toLocaleString()}/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(listing.id)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition-colors ${
                          listing.available 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {listing.available ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link to={`/house/${listing.id}`} className="text-primary hover:text-opacity-80">
                        View
                      </Link>
                      <button 
                        onClick={() => alert('Edit feature coming soon!')} 
                        className="text-accent hover:text-opacity-80"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteListing(listing.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyListingsPage;