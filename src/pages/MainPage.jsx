import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { mockHouses } from '../data/houses';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[calc(100vh-4rem)] bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Find Your Dream Home</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Search through thousands of listings to find the perfect place to call home. Your next adventure starts here.</p>
            <div className="mt-4 text-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => navigate('/search')}
                className="text-text-main hover:text-primary"
                size="sm"
              >
                Start searching for your dream home here!
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