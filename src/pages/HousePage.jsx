import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { getPostById } from '../apis/postApi';
import { createComment } from '../apis/commentApi';
import { useAuth } from '../hooks/useAuth';
import { STATIC_URL } from '../apis/apiFetch';
import MapComponent from '../components/MapComponent';

const StarRating = ({ rating, setRating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
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
  const { user } = useAuth();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setHouse(data);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating < 1 || rating > 5) return;
    try {
      await createComment({ postId: id, content: comment.trim(), rating });
      const updated = await getPostById(id);
      setHouse(updated);
      setComment('');
      setRating(0);
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8 text-center">Loading...</div>;
  }

  if (!house) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Post not found</h2>
        <Link to="/search">
          <Button variant="primary" className="mt-4">Browse Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      {/* Image Gallery */}
      <div className="mb-8 relative">
        <img
          src={`${STATIC_URL}/${house.images[currentImageIndex]?.baseUrl}`}
          alt="Property"
          className="w-full h-[250px] md:h-[400px] lg:h-[600px] object-cover rounded-xl shadow-2xl"
        />
        {house.images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((currentImageIndex - 1 + house.images.length) % house.images.length)}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentImageIndex((currentImageIndex + 1) % house.images.length)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main">{house.content}</h1>
            <p className="text-sm md:text-base lg:text-lg text-text-muted">{house.category?.name}</p>
            <p className="text-primary font-bold text-lg md:text-xl mt-2">${house.price.toLocaleString()} / month</p>
          </div>

          {/* Property Specs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xl font-bold">{house.bedroom}</p>
              <p className="text-text-muted text-sm">Bedrooms</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{house.area}</p>
              <p className="text-text-muted text-sm">Area (m²)</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <p className={`text-xl font-bold ${house.isRented ? 'text-red-500' : 'text-green-600'}`}>
                {house.isRented ? 'Rented' : 'Available'}
              </p>
              <p className="text-text-muted text-sm">Status</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-text-main mb-4">Description</h2>
            <p className="text-text-muted leading-relaxed">{house.content}</p>
          </div>

          {/* Comments */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-text-main">Comments & Ratings</h2>

            {user && (
              <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Your Rating</label>
                  <StarRating rating={rating} setRating={setRating} />
                </div>
                <textarea
                  rows={3}
                  className="w-full border border-border rounded-md p-2"
                  placeholder="Write your comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={rating < 1 || comment.trim().length === 0}
                >
                  Submit
                </Button>
              </form>
            )}

            {house.comments.length === 0 ? (
              <p className="text-text-muted">No comments yet.</p>
            ) : (
              <div className="space-y-4">
                {house.comments.map((c, i) => (
                  <div key={i} className="border-t pt-4">
                    <p className="font-medium text-text-main">{c.user.fullName}</p>
                    <p className="text-yellow-500 text-sm">{"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}</p>
                    <p className="text-text-muted">{c.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h3 className="text-lg md:text-xl font-semibold text-text-main mb-2">Contact Owner</h3>
            <p className="text-sm text-text-muted mb-4">Reach out to the property owner directly for inquiries.</p>
            <Button variant="outline" className="w-full">Call: {house.user.phone}</Button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow mt-4">
            <MapComponent location={house.location} title={house.content} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HousePage;