import { useAuth } from '../hooks/useAuth';

const PersonalPage = () => {
  const { user, logout, loading: authLoading } = useAuth();

  if (authLoading) return <div className="container mx-auto p-4 text-center">Loading profile...</div>;
  if (!user) return <div className="container mx-auto p-4 text-center">User not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-main mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-text-main mb-6">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium text-text-main">Full Name</label>
                  <p className="text-text-muted">{user.name}</p>
                </div>
                <div>
                  <label className="block font-medium text-text-main">Email Address</label>
                  <p className="text-text-muted">{user.email}</p>
                </div>
                <div>
                  <label className="block font-medium text-text-main">Phone Number</label>
                  <p className="text-text-muted">{user.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-text-main mb-4">Account</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-text-main">My Listings</h4>
                  <p className="text-sm text-green-600">2</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-text-main">Total Reviews</h4>
                  <p className="text-sm text-green-600">13</p>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={logout}
                    className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalPage;