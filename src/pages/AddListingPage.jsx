import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { createPost } from '../apis/postApi';
import { getAllCategories } from '../apis/categoryApi';
import MapPicker from '../components/MapPicker';

const AddListingPage = () => {
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 files
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!location) {
      setError('You must pin a location on the map.');
      setLoading(false);
      return;
    }

    if (images.length == 0) {
      setError('You must have at least 1 image.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('categoryId', categoryId);
      formData.append('price', price);
      formData.append('area', area);
      formData.append('address', address);
      formData.append('location', location);
      formData.append('bedroom', bedroom);
      formData.append('content', content);
      images.forEach((file) => formData.append('images', file));

      await createPost(formData);
      navigate('/listings');
    } catch (err) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-text-main">Create New Listing</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-sm">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-sm">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block mb-1 font-medium text-sm">Area (m²)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium text-sm">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2"
          />
        </div>

        {/* Location Map */}
        <div>
          <label className="block mb-1 font-medium text-sm">Pin Location</label>
          <MapPicker value={location} onChange={setLocation} />
          <input
            type="text"
            readOnly
            value={location}
            className="w-full mt-2 bg-gray-100 text-gray-600 px-3 py-2 border border-border rounded-md"
          />
        </div>

        {/* Bedroom */}
        <div>
          <label className="block mb-1 font-medium text-sm">Bedroom</label>
          <input
            type="number"
            value={bedroom}
            onChange={(e) => setBedroom(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium text-sm">Description</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2"
            rows={4}
          />
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1 font-medium text-sm">Images (only first 5 will be saved)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />

          {imagePreviews.length > 0 && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative border rounded shadow overflow-hidden">
                  <img src={src} alt={`Preview ${i}`} className="object-cover w-full h-40" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Listing'}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddListingPage;