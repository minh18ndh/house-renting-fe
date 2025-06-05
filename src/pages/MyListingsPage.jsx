import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getMeApi } from '../apis/authApi';
import { getAllPosts, deletePost } from '../apis/postApi';
import { STATIC_URL } from '../apis/apiFetch';
import { format } from 'date-fns';

const MyListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const me = await getMeApi();
        setUser(me);

        const filters = me.role === 'Admin' ? {} : { userId: me.id };
        const posts = await getAllPosts(filters);
        setListings(posts);
      } catch (err) {
        console.error('Failed to load listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      await deletePost(id);
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (err) {
      console.error('Failed to delete listing:', err);
      alert('Failed to delete listing. Please try again later.');
    }
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
          <h1 className="text-3xl font-bold text-text-main">
            {user?.role === 'Admin' ? 'All Listings' : 'My Listings'}
          </h1>
          <p className="text-text-muted mt-1">
            {user?.role === 'Admin' ? 'All properties across the platform' : 'Manage your property listings'}
          </p>
        </div>
        {user?.role !== 'Admin' &&
          <Button onClick={() => navigate('/add-listing')}>
            + Add New Listing
          </Button>
        }
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-text-main mb-2">No listings yet</h3>
          <p className="text-text-muted mb-6 max-w-md mx-auto">
            {user?.role === 'Admin'
              ? 'No properties have been listed yet on the platform.'
              : 'Start earning by listing your property. It’s easy and takes just a few minutes.'}
          </p>
          <Button variant="primary" onClick={() => navigate('/add-listing')}>
            Create Your First Listing
          </Button>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:hidden">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <img
                  src={listing.images?.[0]?.baseUrl ? `${STATIC_URL}/${listing.images[0].baseUrl}` : '/placeholder.svg'}
                  alt={listing.address || 'Property'}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold text-text-main mb-1">
                  {listing.address || 'No title'}
                </h3>
                <p className="text-sm text-text-muted mb-1">
                  Uploaded: {listing.uploadDate ? format(new Date(listing.uploadDate), 'MMM do yyyy') : '—'}
                </p>
                <p className="text-sm text-text-main font-bold mb-2">
                  ${listing.price.toLocaleString()}/mo
                </p>
                <div
                  className={`text-xs font-semibold mb-2 w-fit px-3 py-1 rounded-full ${listing.isRented ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                >
                  {listing.isRented ? 'Rented' : 'Available'}
                </div>
                <div className="flex justify-between text-sm mt-auto pt-3 border-t border-gray-200">
                  <Link to={`/house/${listing.id}`} className="text-primary hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteListing(listing.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Upload Date</th>
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
                          src={listing.images?.[0]?.baseUrl ? `${STATIC_URL}/${listing.images[0].baseUrl}` : '/placeholder.svg'}
                          alt={listing.address || 'Property'}
                          className="w-16 h-12 object-cover rounded-lg mr-4"
                        />
                        <div className="text-sm font-medium text-text-main">{listing.address || 'No title'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                      {listing.uploadDate ? format(new Date(listing.uploadDate), 'MMM do yyyy') : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-main">
                      ${listing.price.toLocaleString()}/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${!listing.isRented ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {listing.isRented ? 'Rented' : 'Available'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link to={`/house/${listing.id}`} className="text-primary hover:text-opacity-80">
                        Edit
                      </Link>
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