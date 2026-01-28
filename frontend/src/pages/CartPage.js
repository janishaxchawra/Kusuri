import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const CartPage = ({ cart, updateCart, removeFromCart, setCurrentPage }) => {
  const { user, token } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our amazing products and add them to your cart!
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-8 py-3 btn-primary text-white rounded-full text-lg font-medium"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 fade-in">
      <h1 className="text-4xl font-display font-bold text-gray-800 mb-8">
        Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl p-6 shadow-md flex items-center space-x-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-24 h-24 bg-amber-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.images?.[0] ? (
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🧴</span>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.brand}</p>
                <p className="text-xl font-bold text-amber-900 mt-2">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateCart(item._id, item.quantity - 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x-2 border-gray-300 font-semibold min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCart(item._id, item.quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600 font-semibold">Free (Store Pickup)</span>
              </div>
              <div className="border-t-2 pt-4 flex justify-between text-2xl font-bold text-gray-800">
                <span>Total</span>
                <span className="text-amber-900">₹{total}</span>
              </div>
            </div>

            {user ? (
              <>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg mb-3"
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-center text-gray-500">📱 Admin will be notified via WhatsApp</p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Please login to complete your order</p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="w-full btn-primary text-white py-4 rounded-xl font-semibold"
                >
                  Login to Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCheckout && <CheckoutModal cart={cart} total={total} onClose={() => setShowCheckout(false)} />}
    </div>
  );
};

const CheckoutModal = ({ cart, total, onClose }) => {
  const { user, token } = useAuth();
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        notes
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order failed');
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      alert(`Order failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-12 max-w-md w-full text-center modal-content">
          <div className="text-7xl mb-6 animate-bounce">✅</div>
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Order Placed!</h2>
          <p className="text-lg text-gray-600 mb-2">Your order has been received successfully.</p>
          <p className="text-gray-600">
            📱 Admin has been notified via <strong>WhatsApp</strong>.
            <br />
            You'll receive confirmation soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-lg w-full modal-content shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-display font-bold text-gray-800">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">
            ×
          </button>
        </div>

        <form onSubmit={handleCheckout}>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Customer Details</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mb-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">📍</span>
              <div>
                <p className="font-semibold text-amber-900 mb-1">Store Pickup Only</p>
                <p className="text-sm text-amber-800">
                  Please collect your order from our store. We'll notify you via WhatsApp when it's ready!
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 mt-3 pt-3 flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-amber-900">₹{total}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests / Notes (Optional)
            </label>
            <textarea
              placeholder="Any special requests or preferences?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">📱 Admin will receive instant WhatsApp notification</p>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
