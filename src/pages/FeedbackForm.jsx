import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const FeedbackForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('sent successfully');
    setMessage('Sent successfully!');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full border border-border">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Feedback Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-text-main block mb-1">Your Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

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

          <Button type="submit" className="w-full">Submit</Button>

          {message && <p className="text-green-600 text-center pt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;