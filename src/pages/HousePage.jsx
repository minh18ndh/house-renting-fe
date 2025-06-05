import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import { getPostById, updatePost } from '../apis/postApi';
import { createComment } from '../apis/commentApi';
import { useAuth } from '../hooks/useAuth';
import { STATIC_URL } from '../apis/apiFetch';
import MapComponent from '../components/MapComponent';
import MapPicker from '../components/MapPicker';

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
  const [editMode, setEditMode] = useState(false);

  const [address, setAddress] = useState('');
  const [isRented, setIsRented] = useState(false);
  const [bedroom, setBedroom] = useState(1);
  const [area, setArea] = useState(0);
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setHouse(data);
        setAddress(data.address);
        setIsRented(data.isRented);
        setBedroom(data.bedroom);
        setArea(data.area);
        setPrice(data.price);
        setContent(data.content);
        setLocation(data.location);
      } catch (err) {
        console.error('Failed to fetch post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const canEdit = user?.role === 'Admin' || user?.id === house?.userId;

  const handleSave = async () => {
    try {
      await updatePost(house.id, {
        address, isRented, bedroom: Number(bedroom), area: Number(area), price: Number(price), content, location
      });

      const updated = await getPostById(house.id);
      setHouse(updated);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

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
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
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
      <div className="mb-6 relative">
        <img
          src={house.images?.[0]?.baseUrl ? `${STATIC_URL}/${house.images[currentImageIndex].baseUrl}` : '/placeholder.svg'}
          alt="Property"
          className="w-full h-[300px] md:h-[500px] object-cover rounded-xl shadow-lg"
        />
        {house.images.length > 1 && (
          <>
            <button onClick={() => setCurrentImageIndex((currentImageIndex - 1 + house.images.length) % house.images.length)}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">←</button>
            <button onClick={() => setCurrentImageIndex((currentImageIndex + 1) % house.images.length)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">→</button>
          </>
        )}
      </div>

      {canEdit && (
        <div className="flex justify-end gap-3 mb-4">
          {editMode ? (
            <>
              <Button onClick={handleSave} variant="primary">Save</Button>
              <Button onClick={() => setEditMode(false)} variant="outline">Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} variant="outline">Edit Post</Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            {editMode ? (
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xl font-bold border border-border rounded-md px-3 py-2"
              />
            ) : (
              <h1 className="text-2xl font-bold text-text-main">{house.address}</h1>
            )}
            <p className="text-sm text-text-muted">{house.category?.name}</p>
            {editMode ? (
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="text-primary font-bold text-lg mt-2 border border-border rounded-md px-3 py-2"
              />
            ) : (
              <p className="text-primary font-bold text-lg mt-2">${house.price.toLocaleString()} / month</p>
            )}
          </div>

          {/* Property Specs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              {editMode ? (
                <input type="number" value={bedroom} onChange={(e) => setBedroom(e.target.value)} className="text-center border border-border rounded-md px-2 py-1" />
              ) : (
                <p className="text-xl font-bold">{house.bedroom}</p>
              )}
              <p className="text-text-muted text-sm">Bedrooms</p>
            </div>
            <div className="text-center">
              {editMode ? (
                <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="text-center border border-border rounded-md px-2 py-1" />
              ) : (
                <p className="text-xl font-bold">{house.area}</p>
              )}
              <p className="text-text-muted text-sm">Area (m²)</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              {editMode ? (
                <select value={isRented} onChange={(e) => setIsRented(e.target.value === 'true')} className="text-center border border-border rounded-md px-2 py-1">
                  <option value="false">Available</option>
                  <option value="true">Rented</option>
                </select>
              ) : (
                <p className={`text-xl font-bold ${house.isRented ? 'text-red-500' : 'text-green-600'}`}>
                  {house.isRented ? 'Rented' : 'Available'}
                </p>
              )}
              <p className="text-text-muted text-sm">Status</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-text-main mb-4">Description</h2>
            {editMode ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-border rounded-md p-2"
              />
            ) : (
              <p className="text-text-muted leading-relaxed">{house.content}</p>
            )}
          </div>

          {/* Comments */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-text-main">Comments & Ratings</h2>
            {user && (
              <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                <StarRating rating={rating} setRating={setRating} />
                <textarea
                  rows={3}
                  className="w-full border border-border rounded-md p-2"
                  placeholder="Write your comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" disabled={rating < 1 || comment.trim().length === 0}>
                  Submit
                </Button>
              </form>
            )}
            {house.comments.map((c, i) => (
              <div key={i} className="border-t pt-4">
                <p className="font-medium text-text-main">{c.user.fullName}</p>
                <p className="text-yellow-500 text-sm">{"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}</p>
                <p className="text-text-muted">{c.content}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-text-main mb-2">Contact Owner</h3>
            <p className="text-sm text-text-muted mb-4">Reach out to the property owner directly for inquiries.</p>
            <Button variant="outline" className="w-full">Call: {house.user.phone}</Button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow mt-4">
            {editMode ? (
              <MapPicker value={location} onChange={setLocation} />
            ) : (
              <MapComponent location={house.location} title={house.address} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HousePage;