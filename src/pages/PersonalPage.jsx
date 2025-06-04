import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const PersonalPage = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (authLoading) return <div className="container mx-auto p-4 text-center">Loading profile...</div>;
  if (!user) return <div className="container mx-auto p-4 text-center">User not found.</div>;

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Updating profile with:', { name, email, phone });
    setStatusMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-main mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-main">Personal Information</h2>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                    Edit Profile
                  </Button>
                )}
              </div>

              {statusMessage && (
                <div className="mb-6 p-4 rounded-md bg-green-100 text-green-700 border border-green-200">
                  {statusMessage}
                </div>
              )}
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                  <Input 
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>
                
                <Input 
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                />

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button type="submit" variant="primary">Save Changes</Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => { 
                        setIsEditing(false); 
                        setName(user.name); 
                        setEmail(user.email); 
                        setPhone('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Account Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-text-main mb-4">Account</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-text-main">Member since</h4>
                  <p className="text-sm text-text-muted">January 2024</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-text-main">Account Status</h4>
                  <p className="text-sm text-green-600">Active</p>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={logout} 
                    variant="outline" 
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <h3 className="text-lg font-semibold text-text-main mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">Properties Viewed</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Saved Properties</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">My Listings</span>
                  <span className="font-medium">2</span>
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