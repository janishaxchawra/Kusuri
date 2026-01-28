import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      alert('✅ Product quantity updated in cart!');
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      alert('✅ Product added to cart!');
    }
  };

  const updateCart = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      setCart(cart.filter(item => item._id !== productId));
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'shop':
        return <ShopPage addToCart={addToCart} />;
      case 'cart':
        return <CartPage cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar setCurrentPage={setCurrentPage} cart={cart} />
        <main>
          {renderPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </AuthProvider>
  );
}

export default App;
