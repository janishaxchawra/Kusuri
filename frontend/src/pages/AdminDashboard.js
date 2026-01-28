import  React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(data.products || []);
      } else if (activeTab === 'orders') {
        const res = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data.orders || []);
      } else if (activeTab === 'feedback') {
        const res = await fetch(`${API_URL}/feedback`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchData();
        alert('Order status updated!');
      }
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-display font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-lg">
          <span className="text-purple-700">👑 Admin Panel</span>
        </div>
      </div>

      <div className="flex space-x-2 mb-8 border-b-2 border-gray-200 overflow-x-auto">
        {['products', 'orders', 'feedback'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-semibold capitalize transition whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-4 border-amber-600 text-amber-700 bg-amber-50'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              showAddProduct={showAddProduct}
              setShowAddProduct={setShowAddProduct}
              fetchData={fetchData}
            />
          )}
          {activeTab === 'orders' && <OrdersTab orders={orders} updateOrderStatus={updateOrderStatus} />}
          {activeTab === 'feedback' && <FeedbackTab feedbacks={feedbacks} />}
        </>
      )}
    </div>
  );
};

const ProductsTab = ({ products, showAddProduct, setShowAddProduct, fetchData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products ({products.length})</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="px-6 py-3 btn-primary text-white rounded-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Product</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
            <div className="h-32 bg-amber-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover rounded-lg" />
              ) : (
                <span className="text-4xl">🧴</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
            <p className="text-2xl font-bold text-amber-900 mb-2">₹{product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock || 0} units</p>
            <p className="text-xs text-gray-400 mt-2">{product.category}</p>
          </div>
        ))}
      </div>

      {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} onSuccess={() => { setShowAddProduct(false); fetchData(); }} />}
    </div>
  );
};

const OrdersTab = ({ orders, updateOrderStatus }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Recent Orders ({orders.length})</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{order.customerName}</h3>
                <p className="text-sm text-gray-600">📧 {order.customerEmail}</p>
                <p className="text-sm text-gray-600">📱 {order.customerPhone}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-900 mb-2">₹{order.totalAmount}</p>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 border-yellow-300 text-yellow-800'
                      : order.status === 'confirmed'
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : order.status === 'ready'
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : order.status === 'completed'
                      ? 'bg-gray-100 border-gray-300 text-gray-800'
                      : 'bg-red-100 border-red-300 text-red-800'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="ready">Ready for Pickup</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">📦 Order Items:</p>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-600">
                    • {item.product?.name || 'Product'} x{item.quantity} - ₹{item.price}
                  </p>
                ))}
              </div>
              {order.notes && (
                <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">📝 Notes:</p>
                  <p className="text-sm text-gray-600 mt-1">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FeedbackTab = ({ feedbacks }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Customer Feedback ({feedbacks.length})</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-gray-800 text-lg">{feedback.name}</p>
                <p className="text-sm text-gray-600">{feedback.email}</p>
              </div>
              <div className="text-2xl">{'⭐'.repeat(feedback.rating)}</div>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg mb-3">"{feedback.message}"</p>
            <p className="text-xs text-gray-500">
              {new Date(feedback.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        ))}
        {feedbacks.length === 0 && (
          <div className="col-span-2 text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-xl">No feedback yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AddProductModal = ({ onClose, onSuccess }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: 'Skincare',
    images: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.split(',').map((img) => img.trim()).filter(Boolean)
      };

      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added successfully!');
        onSuccess();
      } else {
        alert(data.message || 'Failed to add product');
      }
    } catch (error) {
      alert('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-display font-bold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input type="text" placeholder="e.g., Natural Rose Face Cream" required value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea placeholder="Describe the product..." required rows="3" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition"></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
              <input type="number" placeholder="499" required min="0" value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
              <input type="number" placeholder="100" required min="0" value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
            <input type="text" placeholder="Kusuri Mane" required value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition">
              <option>Skincare</option>
              <option>Makeup</option>
              <option>Haircare</option>
              <option>Fragrance</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs (comma-separated)</label>
            <input type="text" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg transition" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-primary text-white py-4 rounded-lg font-semibold disabled:opacity-50">
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;