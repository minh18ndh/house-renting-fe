import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { getAllPosts } from '../apis/postApi';
import { STATIC_URL } from '../apis/apiFetch';

const MainPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetched = await getAllPosts();
        setPosts(fetched);
        const shuffled = fetched.sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Dream Home
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-8 max-w-3xl mx-auto">
            Search through our listings to find the perfect place to (temporarily) call home.
            Your next adventure starts here.
          </p>
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
      </section>

      {/* Featured Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <h2 className="text-xl md:text-2xl font-semibold text-text-main mb-6">
            Featured Listings
          </h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              800: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {featured.map((house) => (
              <SwiperSlide key={house.id}>
                <div
                  onClick={() => navigate(`/house/${house.id}`)}
                  className="bg-white rounded shadow hover:shadow-lg transition p-4 h-full cursor-pointer"
                >
                  <img
                    src={`${STATIC_URL}/${house.images[0]?.baseUrl}`}
                    alt={house.content || 'House'}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-base md:text-lg font-semibold mb-1 text-primary">
                    {house.address}
                  </h3>
                  <p className="text-sm text-text-muted">{house.category?.name}</p>
                  <p className="text-accent font-bold mt-2">
                    ${house.price.toLocaleString()} / month
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatBox number={posts.length + '+'} label="Properties You’ll Love" />
            <StatBox number="2+" label="Cities & Still Growing" />
            <StatBox number="1000+" label="Happy Tenants (Zero Zombies)" />
            <StatBox number="24/7" label="Support. Humans, Not Bots" />
          </div>
        </div>
      </section>
    </div>
  );
};

const StatBox = ({ number, label }) => (
  <div>
    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">{number}</div>
    <div className="text-sm md:text-base text-text-muted">{label}</div>
  </div>
);

export default MainPage;