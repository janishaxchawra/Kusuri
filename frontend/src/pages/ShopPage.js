import React, { useState, useEffect } from 'react';
import API_URL from '../config/api';
import ProductCard from '../components/ProductCard';

const ShopPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url =
        category === 'all'
          ? `${API_URL}/products`
          : `${API_URL}/products?category=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="loading-spinner mb-4"></div>
        <p className="text-xl text-gray-600">Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 fade-in">
      <h1 className="text-5xl font-display font-bold text-center text-gray-800 mb-8">
        All Products
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-2">
        {['all', 'Skincare', 'Makeup', 'Haircare', 'Fragrance'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              category === cat
                ? 'bg-amber-600 text-white'
                : 'bg-white text-gray-700 hover:bg-amber-100'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-2xl text-gray-700 mb-2">No products available yet</p>
          <p className="text-gray-500">Check back soon for amazing products!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
