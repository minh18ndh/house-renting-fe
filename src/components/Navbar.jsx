import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'Admin';

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Search' },
    ...(user ? [
      { path: '/listings', label: isAdmin ? 'Listings' : 'My Listings' },
      ...(isAdmin ? [
        { path: '/comments', label: 'Comments' },
        { path: '/feedbacks', label: 'Feedbacks' },
      ] : []),
      { path: '/profile', label: 'Profile' }
    ] : [])
  ];

  return (
    <nav className="bg-white text-text-main shadow-md fixed top-0 left-0 right-0 z-[9999] h-16">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-xl">RentAHouse</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-text-main'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:text-primary">Login</Link>
              <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90">
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-text-main">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 pt-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === link.path ? 'text-primary' : 'text-text-main'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm hover:text-primary">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block py-2 bg-primary text-white rounded-md text-center mt-2">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="w-full mt-2 bg-accent text-white py-2 rounded-md text-sm">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;