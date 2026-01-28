import React, { useState } from 'react';
import API_URL from '../config/api';
import FeedbackForm from '../components/FeedbackForm';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 fade-in">
      <h1 className="text-5xl font-display font-bold text-center text-gray-800 mb-16">Get in Touch</h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-8">Contact Information</h2>
          <div className="space-y-6 mb-10">
            {[
              { icon: '📧', title: 'Email', info: 'contact@kusurimane.com' },
              { icon: '📱', title: 'Phone', info: '+91 98765 43210' },
              { icon: '📍', title: 'Address', info: '123 Beauty Lane, Bangalore, Karnataka 560001' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{item.title}</p>
                  <p className="text-gray-600">{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl">
            <div className="flex items-start space-x-3">
              <span className="text-3xl">💬</span>
              <div>
                <p className="text-green-900 font-bold text-lg mb-2">WhatsApp Support</p>
                <p className="text-sm text-green-800 leading-relaxed">
                  For bulk orders or urgent queries, message us on WhatsApp! Our admin team receives instant
                  notifications and will respond promptly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Send us a Message</h2>

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-semibold">✅ Message sent successfully!</p>
              <p className="text-sm">We'll contact you soon via WhatsApp or email.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                placeholder="Tell us how we can help you..."
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-white py-4 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            <p className="text-xs text-center text-gray-500">📱 Admin will receive WhatsApp notification instantly</p>
          </form>
        </div>
      </div>

      <FeedbackForm />
    </div>
  );
};

export default ContactPage;