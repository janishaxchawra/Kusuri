import React from 'react';

const ProductCard = ({ product, addToCart, index }) => {
  return (
    <div
      className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden">
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-amber-300 text-8xl">🧴</div>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">
          {product.brand}
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-900">₹{product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-5 py-2 btn-primary text-white rounded-lg text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;