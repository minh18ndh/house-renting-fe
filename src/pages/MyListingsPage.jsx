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
        <Button variant="primary" onClick={() => alert('Add new listing feature coming soon!')}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Add New Listing
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
          {/* Desktop Table View */}
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

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={listing.images?.[0] || '/placeholder.svg?width=80&height=60&text=House'} 
                    alt={listing.address}
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-text-main truncate">{listing.address}</h3>
                    <p className="text-sm text-text-muted">{listing.city}, {listing.state}</p>
                    <p className="text-lg font-bold text-primary">${listing.price.toLocaleString()}/mo</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <button
                        onClick={() => handleToggleStatus(listing.id)}
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          listing.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {listing.available ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Link to={`/house/${listing.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => alert('Edit feature coming soon!')}>
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteListing(listing.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {/* Floating Action Button */}
      <button 
        onClick={() => alert('Add new listing feature coming soon!')}
        className="fixed bottom-8 right-8 bg-accent text-white p-4 rounded-full shadow-xl hover:bg-opacity-90 transition-all hover:scale-110 z-40"
        title="Add New Listing"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default MyListingsPage;