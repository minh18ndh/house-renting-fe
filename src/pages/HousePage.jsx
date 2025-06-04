import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { mockHouses } from '../data/houses';
import { mockComments } from '../data/comments';

const StarRating = ({ rating, setRating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => setRating(star)}
        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </button>
    ))}
  </div>
);

const HousePage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const foundHouse = mockHouses.find(h => h.id.toString() === id);
      if (foundHouse) {
        setHouse(foundHouse);
      }
      setLoading(false);
    }, 500);

    setCommentsList(mockComments[id] || []);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">Loading house details...</div>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="container mx-auto p-4 text-center py-16">
        <div className="text-6xl mb-4">🏠</div>
        <h2 className="text-2xl font-bold text-text-main mb-2">Property not found</h2>
        <p className="text-text-muted mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/search">
          <Button variant="primary">Browse All Properties</Button>
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % house.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + house.images.length) % house.images.length);
  };

  const averageRating = commentsList.length
    ? (commentsList.reduce((sum, c) => sum + c.rating, 0) / commentsList.length).toFixed(1)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-text-muted">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link to="/search" className="hover:text-primary">Search</Link></li>
          <li>/</li>
          <li className="text-text-main">{house.address}</li>
        </ol>
      </nav>

      {/* Image Gallery */}
      <div className="mb-8 relative">
        {house.images && house.images.length > 0 && (
          <>
            <img
              src={house.images[currentImageIndex] || "/placeholder.svg"}
              alt={`View of ${house.address} - ${currentImageIndex + 1}`}
              className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover rounded-xl shadow-2xl"
            />
            {house.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {house.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {house.images.length}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-text-main">{house.address}</h1>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {house.type}
                  </span>
                </div>
                <p className="text-lg text-text-muted flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {house.city}, {house.state} {house.zipCode}
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="text-4xl font-bold text-primary">${house.price.toLocaleString()}</p>
                <p className="text-sm text-text-muted">per month</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-main">{house.bedrooms}</div>
                <div className="text-sm text-text-muted">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-main">{house.bathrooms}</div>
                <div className="text-sm text-text-muted">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-main">{house.area.toLocaleString()}</div>
                <div className="text-sm text-text-muted">Sq Ft</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${house.available ? 'text-green-600' : 'text-red-600'}`}>
                  {house.available ? '✓' : '✗'}
                </div>
                <div className="text-sm text-text-muted">Available</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-text-main mb-4">Description</h2>
              <p className="text-text-muted leading-relaxed">{house.description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-text-main mb-4">Contact Property Owner</h2>

            <div>
              <p className="text-text-muted mb-4">
                Interested in this property? Get in touch with the owner to schedule a viewing or ask questions.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(`tel:+15551234567`, '_self')}
              >
                Call Now
              </Button>
            </div>
          </div>

          {/* Property Info */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <h3 className="text-lg font-semibold text-text-main mb-4">Property Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Property ID</span>
                <span className="font-medium">#{house.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Property Type</span>
                <span className="font-medium">{house.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Year Built</span>
                <span className="font-medium">2018</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-text-main mb-2">Comments & Ratings</h2>

        {averageRating && (
          <p className="mb-4 text-lg text-yellow-500 font-medium">
            Average Rating: {averageRating} / 5 ⭐
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (userName.trim() && comment.trim() && rating > 0) {
              const newComment = {
                name: userName.trim(),
                rating,
                comment: comment.trim(),
                date: new Date().toISOString().split('T')[0]
              };
              setCommentsList(prev => [...prev, newComment]);
              setUserName('');
              setComment('');
              setRating(0);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Your Rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Your Comment</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Your thoughts about this property..."
              required
            />
          </div>

          <Button type="submit" variant="primary">Submit</Button>
        </form>

        {commentsList.length > 0 && (
          <div className="mt-8 space-y-6">
            {commentsList.map((item, idx) => (
              <div key={idx} className="border-t pt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-text-main">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <div className="text-yellow-500 mb-1">
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </div>
                <p className="text-text-muted">{item.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HousePage;