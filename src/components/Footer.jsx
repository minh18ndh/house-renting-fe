import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-text-main text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-xl">RentAHouse</span>
            </div>
            <p className="text-sm text-gray-400">Find your next home with us.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/search" className="hover:text-primary text-sm transition-colors">Search Properties</Link></li>
              <li><Link to="/about" className="hover:text-primary text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Support</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-primary text-sm transition-colors">Feedback Form</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Contact</h5>
            <p className="text-sm text-gray-400">1 Dai Co Viet</p>
            <p className="text-sm text-gray-400">Hai Ba Trung, HN 11600</p>
            <p className="text-sm text-gray-400">contact@rentahouse.com</p>
            <p className="text-sm text-gray-400">038 669 6699</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} RentAHouse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;