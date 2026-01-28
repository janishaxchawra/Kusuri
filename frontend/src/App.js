import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, LogOut, User, Plus, Minus, Trash2 } from 'lucide-react';
import axios from 'axios';

// IMPORTANT: Make sure this matches your backend URL
const API_URL = 'http://localhost:5000/api';

const KusuriManeFixed = () => {
  // State Management
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  // Form States
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Load data on mount
  useEffect(() => {
    console.log('🔄 Component mounted, checking authentication...');
    const token = localStorage.getItem('token');
    if (token) {
      console.log('✅ Token found, verifying...');
      verifyToken(token);
    }
    loadProducts();
    loadCart();
  }, []);

  // API Functions
  const verifyToken = async (token) => {
    try {
      console.log('📡 Verifying token with backend...');
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Token verified, user:', response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      localStorage.removeItem('token');
    }
  };

  const loadProducts = async () => {
    try {
      console.log('📡 Loading products...');
      const response = await axios.get(`${API_URL}/products`);
      console.log('✅ Products loaded:', response.data.length);
      setProducts(response.data);
    } catch (error) {
      console.error('❌ Error loading products:', error);
      alert('Failed to load products. Make sure backend is running!');
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      console.log('✅ Cart loaded from localStorage:', parsedCart.length, 'items');
      setCart(parsedCart);
    }
  };

  const saveCart = (newCart) => {
    console.log('💾 Saving cart:', newCart.length, 'items');
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('🔐 Attempting login...');
    console.log('📧 Email:', authForm.email);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: authForm.email,
        password: authForm.password
      });
      
      console.log('✅ Login successful!', response.data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setShowAuthModal(false);
      alert('Login successful!');
      
      // Reset form
      setAuthForm({ name: '', email: '', password: '', phone: '', address: '' });
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error);
      alert(error.response?.data?.message || 'Login failed. Check console for details.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('📝 Attempting registration...');
    
    try {
      const response = await axios.post(`${API_URL}/auth/register`, authForm);
      console.log('✅ Registration successful!', response.data);
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setShowAuthModal(false);
      alert('Registration successful!');
      
      // Reset form
      setAuthForm({ name: '', email: '', password: '', phone: '', address: '' });
    } catch (error) {
      console.error('❌ Registration failed:', error.response?.data || error);
      alert(error.response?.data?.message || 'Registration failed. Check console for details.');
    }
  };

  const handleLogout = () => {
    console.log('👋 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setUser(null);
    setCart([]);
    setCurrentPage('home');
    alert('Logged out successfully');
  };

  const addToCart = (product) => {
    console.log('🛒 Adding to cart:', product.name);
    
    if (!user) {
      console.log('⚠️ User not logged in');
      alert('Please login to add items to cart');
      setShowAuthModal(true);
      return;
    }

    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      const newCart = cart.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(newCart);
      console.log('✅ Increased quantity');
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
      console.log('✅ Added new item to cart');
    }
    alert(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    console.log('🗑️ Removing from cart:', productId);
    const newCart = cart.filter(item => item._id !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    console.log('🔢 Updating quantity:', productId, 'to', newQuantity);
    const newCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(newCart);
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      setShowAuthModal(true);
      return;
    }

    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    console.log('💳 Processing checkout...');

    try {
      const token = localStorage.getItem('token');
      const items = cart.map(item => ({
        productId: item._id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      console.log('📦 Order details:', { items, totalAmount });

      const response = await axios.post(`${API_URL}/orders`, 
        { items, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('✅ Order placed successfully!', response.data);
      alert('Order placed successfully! Admin will contact you via WhatsApp soon.');
      saveCart([]);
      setCurrentPage('home');
    } catch (error) {
      console.error('❌ Checkout failed:', error.response?.data || error);
      alert(error.response?.data?.message || 'Checkout failed. Check console for details.');
    }
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    console.log('📧 Submitting contact form...');
    
    try {
      await axios.post(`${API_URL}/contact`, contactForm);
      alert('Message sent successfully! We will contact you soon.');
      setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('❌ Contact form failed:', error);
      alert('Failed to send message');
    }
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'handicrafts', name: 'Handicrafts' },
    { id: 'art', name: 'Art & Paintings' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'accessories', name: 'Accessories' }
  ];

  // Navigation Component
  const Navigation = () => (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E5E5',
      zIndex: 1000,
      height: '80px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div 
          onClick={() => setCurrentPage('home')}
          style={{ 
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '24px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            color: '#000000',
            cursor: 'pointer'
          }}
        >
          Kusuri Mane
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
          <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', fontWeight: currentPage === 'home' ? '500' : '400' }}>Home</button>
          <button onClick={() => setCurrentPage('shop')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', fontWeight: currentPage === 'shop' ? '500' : '400' }}>Shop All</button>
          <button onClick={() => setCurrentPage('about')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', fontWeight: currentPage === 'about' ? '500' : '400' }}>About</button>
          <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', fontWeight: currentPage === 'contact' ? '500' : '400' }}>Contact</button>
          
          {user ? (
            <>
              {user.isAdmin && (
                <button onClick={() => setCurrentPage('admin')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', fontWeight: currentPage === 'admin' ? '500' : '400' }}>Admin</button>
              )}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <button onClick={() => { console.log('🔘 Login button clicked'); setShowAuthModal(true); }} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer' }}>
              <User size={18} style={{ display: 'inline', marginRight: '5px' }} /> Log In
            </button>
          )}
          
          <button onClick={() => setCurrentPage('cart')} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '0' }}>
            <ShoppingBag size={24} color="#000000" />
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );

  // Auth Modal
  const AuthModal = () => {
    if (!showAuthModal) return null;

    console.log('🔔 Auth modal is open, mode:', authMode);

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowAuthModal(false)}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '8px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button onClick={() => { console.log('Switching to login'); setAuthMode('login'); }} style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: authMode === 'login' ? '#000000' : '#F5F5F5', color: authMode === 'login' ? '#FFFFFF' : '#000000', cursor: 'pointer', fontFamily: 'Avenir' }}>Login</button>
            <button onClick={() => { console.log('Switching to register'); setAuthMode('register'); }} style={{ flex: 1, padding: '10px', border: 'none', backgroundColor: authMode === 'register' ? '#000000' : '#F5F5F5', color: authMode === 'register' ? '#FFFFFF' : '#000000', cursor: 'pointer', fontFamily: 'Avenir' }}>Register</button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email*" required value={authForm.email} onChange={(e) => setAuthForm({...authForm, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box' }} />
              <input type="password" placeholder="Password*" required value={authForm.password} onChange={(e) => setAuthForm({...authForm, password: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box' }} />
              <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#000000', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontFamily: 'Avenir', fontSize: '16px' }}>Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Name*" required value={authForm.name} onChange={(e) => setAuthForm({...authForm, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box' }} />
              <input type="email" placeholder="Email*" required value={authForm.email} onChange={(e) => setAuthForm({...authForm, email: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box' }} />
              <input type="password" placeholder="Password*" required value={authForm.password} onChange={(e) => setAuthForm({...authForm, password: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box' }} />
              <input type="tel" placeholder="Phone*" required value={authForm.phone} onChange={(e) => setAuthForm({...authForm, phone: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box' }} />
              <textarea placeholder="Address*" required value={authForm.address} onChange={(e) => setAuthForm({...authForm, address: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', boxSizing: 'border-box', resize: 'vertical' }} rows="3" />
              <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#000000', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontFamily: 'Avenir', fontSize: '16px' }}>Register</button>
            </form>
          )}
        </div>
      </div>
    );
  };

  // Product Card with ADD TO CART button
  const ProductCard = ({ product }) => (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ position: 'relative', marginBottom: '15px', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
        {product.images && product.images[0] ? (
          <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} style={{ width: '100%', display: 'block', height: '400px', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999999' }}>
            {/* IMAGE LOCATION: Product images uploaded by admin */}
            No Image
          </div>
        )}
        <button 
          onClick={() => addToCart(product)} 
          style={{ 
            position: 'absolute', 
            bottom: '10px', 
            left: '10px', 
            backgroundColor: '#000000', 
            color: '#FFFFFF', 
            border: 'none', 
            padding: '10px 20px', 
            fontFamily: 'Avenir', 
            fontSize: '14px', 
            cursor: 'pointer', 
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
      <div style={{ textAlign: 'left' }}>
        <h3 style={{ fontFamily: 'Avenir', fontSize: '18px', fontWeight: '400', marginBottom: '8px', color: '#000000' }}>{product.name}</h3>
        <p style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#666666', marginBottom: '8px' }}>{product.brandName}</p>
        <p style={{ fontFamily: 'Avenir', fontSize: '16px', color: '#000000', margin: '0' }}>₹{product.price.toFixed(2)}</p>
      </div>
    </div>
  );

  // HomePage
  const HomePage = () => (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ backgroundColor: '#FFF8F0', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* 
            IMAGE/VIDEO LOCATION #1: Hero Section
            Current location: frontend/public/images/hero-handicrafts.jpg
            To change: Replace the src below with your image/video path
          */}
          <div style={{ marginBottom: '40px' }}>
            
            {
            <video width="400" controls autoPlay muted loop style={{ maxWidth: '100%' }}>
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
            }
          </div>
          
          <h1 style={{ fontFamily: 'Avenir', fontSize: '48px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '30px', color: '#000000', lineHeight: '1.2' }}>
            DISCOVER EXQUISITE HANDICRAFTS
          </h1>
          <p style={{ fontFamily: 'Avenir', fontSize: '18px', lineHeight: '1.7', marginBottom: '40px', color: '#000000', maxWidth: '700px', margin: '0 auto 40px' }}>
            Immerse yourself in a world of exquisite handicrafts that embody the rich cultural heritage of India. Our curated collection showcases the artistic prowess of rural married women, offering unique and authentic pieces waiting to be explored.
          </p>
          <button onClick={() => setCurrentPage('shop')} style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', padding: '15px 40px', fontFamily: 'Avenir', fontSize: '16px', cursor: 'pointer', fontWeight: '500', letterSpacing: '0.05em' }}>
            Explore Now
          </button>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Avenir', fontSize: '36px', fontWeight: '300', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '20px', color: '#000000' }}>PRODUCTS</h2>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <button onClick={() => setCurrentPage('shop')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', textDecoration: 'underline' }}>Browse Collection</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
            {products.slice(0, 6).map(product => <ProductCard key={product._id} product={product} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            {/* 
              IMAGE/VIDEO LOCATION #2: About Preview Section
              Current location: frontend/public/images/about-preview.jpg
            */}
            <img 
              src="/images/about-preview.jpg" 
              alt="Our Vision" 
              style={{ width: '100%', display: 'block' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop';
              }}
            />
            <p style={{ fontFamily: 'Avenir', fontSize: '14px', marginTop: '10px', color: '#666666' }}>Our Vision</p>
          </div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontFamily: 'Avenir', fontSize: '36px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '25px', color: '#000000' }}>ABOUT KUSURIMANE</h2>
            <p style={{ fontFamily: 'Avenir', fontSize: '16px', lineHeight: '1.7', marginBottom: '30px', color: '#000000' }}>
              At KusuriMane, we empower rural married women to produce high-quality handicrafts, providing them with a sustainable source of income. Our platform celebrates their artistry and dedication, offering a glimpse into their inspiring stories and traditional craftsmanship.
            </p>
            <button onClick={() => setCurrentPage('about')} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: '#000000', cursor: 'pointer', textDecoration: 'underline', padding: '0' }}>Learn More</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Avenir', fontSize: '36px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '10px', color: '#000000' }}>GALLERY</h2>
          <p style={{ fontFamily: 'Avenir', fontSize: '18px', marginBottom: '20px', color: '#000000' }}>Artisanal Creations</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
            {/* 
              IMAGE/VIDEO LOCATIONS #3, #4, #5: Gallery Items
              Current locations:
              - frontend/public/images/gallery-traditional.jpg
              - frontend/public/images/gallery-contemporary.jpg
              - frontend/public/images/gallery-artisans.jpg
            */}
            {[
              { title: 'Traditional Crafts', subtitle: 'Embrace Tradition', img: '/images/gallery-traditional.jpg', fallback: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop', desc: 'Embark on a journey through the world of traditional crafts, each piece reflecting the timeless techniques and cultural significance.' },
              { title: 'Contemporary Designs', subtitle: 'Exploring Modernity', img: '/images/gallery-contemporary.jpg', fallback: 'https://images.unsplash.com/photo-1566054531356-e8b8c50b1e7c?w=400&h=300&fit=crop', desc: 'Experience the fusion of tradition and innovation in our collection of contemporary designs.' },
              { title: 'Empowering Artisans', subtitle: 'Celebrating Creativity', img: '/images/gallery-artisans.jpg', fallback: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop', desc: 'Celebrate the spirit of creativity and resilience as you explore the stories behind the artisans.' }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'left' }}>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ width: '100%', marginBottom: '20px' }}
                  onError={(e) => { e.target.src = item.fallback; }}
                />
                <h3 style={{ fontFamily: 'Avenir', fontSize: '24px', fontWeight: '400', marginBottom: '10px', color: '#000000' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Avenir', fontSize: '16px', fontWeight: '500', marginBottom: '15px', color: '#000000' }}>{item.subtitle}</p>
                <p style={{ fontFamily: 'Avenir', fontSize: '14px', lineHeight: '1.6', color: '#666666' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Avenir', fontSize: '36px', fontWeight: '300', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '60px', color: '#000000' }}>GET IN TOUCH</h2>
          <form onSubmit={handleContactForm}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>First name*</label>
                <input type="text" required value={contactForm.firstName} onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Last name*</label>
                <input type="text" required value={contactForm.lastName} onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Email*</label>
              <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Phone</label>
              <input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Message</label>
              <textarea rows="6" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', padding: '15px 40px', fontFamily: 'Avenir', fontSize: '16px', cursor: 'pointer', fontWeight: '500', width: '100%' }}>Submit</button>
          </form>
        </div>
      </section>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <span onClick={() => setCurrentPage('home')} style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', cursor: 'pointer', textDecoration: 'underline' }}>Home</span>
          <span style={{ margin: '0 10px', color: '#666666' }}>/</span>
          <span style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#666666' }}>All Products</span>
        </div>

        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 250px', minWidth: '250px' }}>
            <h3 style={{ fontFamily: 'Avenir', fontSize: '18px', fontWeight: '500', marginBottom: '20px', color: '#000000' }}>Browse by</h3>
            <div style={{ marginBottom: '40px' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ marginBottom: '12px' }}>
                  <button onClick={() => setSelectedCategory(cat.id)} style={{ background: 'none', border: 'none', fontFamily: 'Avenir', fontSize: '16px', color: selectedCategory === cat.id ? '#000000' : '#666666', cursor: 'pointer', fontWeight: selectedCategory === cat.id ? '500' : '400', padding: '0', textAlign: 'left', width: '100%' }}>{cat.name}</button>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: 'Avenir', fontSize: '18px', fontWeight: '500', marginBottom: '20px', color: '#000000' }}>Filter by Price</h3>
            <div>
              <p style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#666666', marginBottom: '10px' }}>₹{priceRange[0]} - ₹{priceRange[1]}</p>
              <input type="range" min="0" max="5000" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ flex: '1' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontFamily: 'Avenir', fontSize: '36px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '20px', color: '#000000' }}>All Products</h1>
            </div>

            <p style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#666666', marginBottom: '30px' }}>{filteredProducts.length} products</p>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontFamily: 'Avenir', fontSize: '18px', color: '#666666' }}>No products available. Admin needs to add products.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
                {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Cart Page with Quantity Controls
  const CartPage = () => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
          <h1 style={{ fontFamily: 'Avenir', fontSize: '48px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '40px', color: '#000000', textAlign: 'center' }}>SHOPPING CART</h1>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontFamily: 'Avenir', fontSize: '18px', color: '#666666', marginBottom: '30px' }}>Your cart is empty</p>
              <button onClick={() => setCurrentPage('shop')} style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', padding: '15px 40px', fontFamily: 'Avenir', fontSize: '16px', cursor: 'pointer' }}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#FFFFFF', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {item.images && item.images[0] ? (
                    <img src={`http://localhost:5000/${item.images[0]}`} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100px', height: '100px', backgroundColor: '#E5E5E5' }} />
                  )}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ fontFamily: 'Avenir', fontSize: '18px', marginBottom: '5px', fontWeight: '500' }}>{item.name}</h3>
                    <p style={{ fontFamily: 'Avenir', fontSize: '16px', color: '#666666' }}>₹{item.price} each</p>
                    <p style={{ fontFamily: 'Avenir', fontSize: '16px', color: '#000000', fontWeight: '500' }}>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ padding: '8px 12px', border: '1px solid #000000', background: '#FFFFFF', cursor: 'pointer', fontFamily: 'Avenir', fontSize: '16px' }}>
                      <Minus size={16} />
                    </button>
                    <span style={{ fontFamily: 'Avenir', fontSize: '18px', fontWeight: '500', minWidth: '40px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ padding: '8px 12px', border: '1px solid #000000', background: '#FFFFFF', cursor: 'pointer', fontFamily: 'Avenir', fontSize: '16px' }}>
                      <Plus size={16} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} style={{ padding: '10px 15px', backgroundColor: '#FF0000', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontFamily: 'Avenir', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}

              <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#FFFFFF' }}>
                <div style={{ marginBottom: '20px', borderBottom: '2px solid #000000', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'Avenir', fontSize: '18px' }}>Subtotal:</span>
                    <span style={{ fontFamily: 'Avenir', fontSize: '18px' }}>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'Avenir', fontSize: '18px', fontWeight: '600' }}>Total:</span>
                    <span style={{ fontFamily: 'Avenir', fontSize: '24px', fontWeight: '600' }}>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={handleCheckout} style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', padding: '15px 50px', fontFamily: 'Avenir', fontSize: '18px', cursor: 'pointer', fontWeight: '500', width: '100%', marginBottom: '15px' }}>
                  Checkout & Send Order to Admin
                </button>
                <p style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#666666', textAlign: 'center' }}>
                  * Payment will be collected when you pick up the order. Admin will contact you via WhatsApp.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Avenir', fontSize: '48px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '30px', color: '#000000' }}>EXPLORE KusuriMane</h1>
          <p style={{ fontFamily: 'Avenir', fontSize: '18px', lineHeight: '1.7', color: '#000000', marginBottom: '40px' }}>
            Discover the vibrant world of KusuriMane, where rural married women from India showcase their exquisite handmade handicrafts.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              {/* 
                IMAGE/VIDEO LOCATION #6: About Page Mission Image
                Current location: frontend/public/images/about-mission.jpg
              */}
              <img 
                src="/images/about-mission.jpg" 
                alt="Our Mission" 
                style={{ width: '100%', display: 'block' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=700&fit=crop';
                }}
              />
            </div>
            <div>
              <h2 style={{ fontFamily: 'Avenir', fontSize: '36px', fontWeight: '300', letterSpacing: '0.1em', marginBottom: '15px', color: '#000000' }}>Our Mission</h2>
              <p style={{ fontFamily: 'Avenir', fontSize: '18px', fontWeight: '500', marginBottom: '25px', color: '#000000' }}>Empowering Artisans</p>
              <p style={{ fontFamily: 'Avenir', fontSize: '16px', lineHeight: '1.7', color: '#666666', marginBottom: '20px' }}>
                At KusuriMane, our mission is to empower rural married women in India by providing them with a platform to showcase their artistic talents and earn a sustainable livelihood through their handicrafts.
              </p>
              <button onClick={() => setCurrentPage('contact')} style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', padding: '15px 40px', fontFamily: 'Avenir', fontSize: '16px', cursor: 'pointer', fontWeight: '500' }}>Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FFF8F0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: 'Avenir', fontSize: '48px', fontWeight: '300', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '60px', color: '#000000' }}>GET IN TOUCH</h1>
        <form onSubmit={handleContactForm}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>First name*</label>
              <input type="text" required value={contactForm.firstName} onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }} />
            </div>
            <div>
              <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Last name*</label>
              <input type="text" required value={contactForm.lastName} onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Email*</label>
            <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Phone</label>
            <input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#000000', display: 'block', marginBottom: '8px' }}>Message</label>
            <textarea rows="6" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #CCCCCC', fontFamily: 'Avenir', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', backgroundColor: '#FFFFFF' }} />
          </div>
          <button type="submit" style={{ backgroundColor: '#000000', color: '#FFFFFF', border: 'none', padding: '15px 40px', fontFamily: 'Avenir', fontSize: '16px', cursor: 'pointer', fontWeight: '500', width: '100%' }}>Submit</button>
        </form>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '60px 20px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontFamily: 'Avenir', fontSize: '20px', fontWeight: '400', marginBottom: '15px' }}>Kusuri Mane</h3>
          <p style={{ fontFamily: 'Avenir', fontSize: '14px', lineHeight: '1.6', color: '#CCCCCC' }}>
            8971192840<br/>
            kusurimane.com<br/>
            Jayanagar, Bangalore, Karnataka
          </p>
        </div>
        <div style={{ borderTop: '1px solid #333333', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Avenir', fontSize: '14px', color: '#CCCCCC', margin: '0' }}>© 2025 by KusuriMane.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Avenir, Helvetica, Arial, sans-serif' }}>
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      <Footer />
      
      <AuthModal />
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default KusuriManeFixed;