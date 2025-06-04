import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { mockHouses } from '../data/houses';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="h-[calc(100vh-4rem)] bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Find Your Dream Home</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Search through our listings to find the perfect place to (temporarily) call home. Your next adventure starts here.</p>
            <div className="mt-4 text-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => navigate('/search')}
                className="text-text-main hover:text-primary animate-bounce"
                size="sm"
              >
                Start searching for your dream home here!
              </Button>
            </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-text-main mb-6">Featured Projects</h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {getRandomHouses(mockHouses, 4).map((house) => (
              <SwiperSlide key={house.id}>
                <div className="bg-white rounded shadow hover:shadow-lg transition p-4 h-full">
                  <img
                    src={house.images[0]}
                    alt={house.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-1 text-primary">{house.address}</h3>
                  <p className="text-sm text-text-muted">{house.city}</p>
                  <p className="text-accent font-bold mt-2">${house.price.toLocaleString()} / month</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{mockHouses.length}+</div>
              <div className="text-text-muted">Properties You’ll Love</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2+</div>
              <div className="text-text-muted">Cities & Still Growing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-text-muted">Happy Tenants (Zero Zombies)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-text-muted">Support. Humans, Not Bots</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function getRandomHouses(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default MainPage;