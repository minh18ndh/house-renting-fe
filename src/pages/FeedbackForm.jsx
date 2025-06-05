import { useState } from 'react';
import Button from '../components/Button';
import { createFeedback } from '../apis/feedbackApi';

const FeedbackForm = () => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await createFeedback({ content });
      setMessage('Sent successfully!');
      setContent('');
    } catch (err) {
      console.error('Failed to submit feedback:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full border border-border">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Feedback Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-text-main block mb-1">Your Feedback</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              rows="5"
              required
              className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </Button>

          {message && <p className="text-green-600 text-center pt-2">{message}</p>}
          {error && <p className="text-red-600 text-center pt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;