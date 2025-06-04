import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
  ];

  const authenticatedLinks = [
    { path: '/my-listings', label: 'My Listings' },
    { path: '/profile', label: 'Profile' },
  ];

  const renderLinks = (links) =>
    links.map(link => (
      <Link
        key={link.path}
        to={link.path}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
          location.pathname === link.path ? 'text-primary' : 'text-text-main'
        }`}
      >
        {link.label}
      </Link>
    ));

  return (
    <nav className="bg-white text-text-main shadow-md fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="font-bold text-xl">RentAHouse</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {renderLinks(navLinks)}
          {user && renderLinks(authenticatedLinks)}
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-text-main hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">Logout</button>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            {!isMobileMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg p-2 space-y-1">
          {renderLinks(navLinks)}
          {user && renderLinks(authenticatedLinks)}
          <div className="pt-4 pb-3 border-t border-border">
            {!user ? (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-text-main hover:text-primary">Login</Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block bg-primary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90">Sign Up</Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="w-full text-left block bg-accent text-white px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;