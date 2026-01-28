import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const FeedbackForm = () => {
  const { user, token } = useAuth();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit feedback');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, message })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage('');
        setRating(5);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      alert('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-10 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-3">
            💬 Share Your Feedback
          </h2>
          <p className="text-gray-600">We'd love to hear about your experience!</p>
        </div>

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">✅ Thank you for your valuable feedback!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              How would you rate us?
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-4xl focus:outline-none hover:scale-110 transition"
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {rating === 5
                ? 'Excellent!'
                : rating === 4
                ? 'Great!'
                : rating === 3
                ? 'Good'
                : rating === 2
                ? 'Fair'
                : 'Poor'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
            <textarea
              placeholder="Tell us about your experience with our products or service..."
              required
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading || !user}
            className="w-full btn-primary text-white py-4 rounded-lg font-semibold disabled:opacity-50"
          >
            {!user
              ? '🔒 Login to Submit Feedback'
              : loading
              ? 'Submitting...'
              : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;