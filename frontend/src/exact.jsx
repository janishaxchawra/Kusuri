import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

const KusuriManeExact = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([45, 200]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    subscribe: false
  });

  // Exact products from Wix template
  const products = [
    {
      id: 1,
      name: 'Traditional Purse',
      price: 60,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=520&fit=crop',
      category: 'accessories'
    },
    {
      id: 2,
      name: 'Abstract Vivid Forms',
      price: 45,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=520&fit=crop',
      category: 'digital-art'
    },
    {
      id: 3,
      name: 'Urban Motion Capture',
      price: 180,
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=520&fit=crop',
      category: 'digital-art'
    },
    {
      id: 4,
      name: 'Futuristic City Sunset',
      price: 50,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      category: 'digital-art'
    },
    {
      id: 5,
      name: "Nature's Abstract Harmony",
      price: 150,
      image: 'https://images.unsplash.com/photo-1578926078086-aaac2f7f3ed3?w=400&h=300&fit=crop',
      category: 'monoprints'
    },
    {
      id: 6,
      name: 'Serene Landscape Vibes',
      price: 200,
      image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=520&fit=crop',
      category: 'monoprints'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'digital-art', name: 'Digital Art' },
    { id: 'monoprints', name: 'Monoprints' }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  // Navigation Component - Exact Wix style
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
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
          <button 
            onClick={() => setCurrentPage('home')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              color: '#000000',
              cursor: 'pointer',
              padding: '0',
              fontWeight: currentPage === 'home' ? '500' : '400'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('shop')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              color: '#000000',
              cursor: 'pointer',
              padding: '0',
              fontWeight: currentPage === 'shop' ? '500' : '400'
            }}
          >
            Shop All
          </button>
          <button 
            onClick={() => setCurrentPage('about')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              color: '#000000',
              cursor: 'pointer',
              padding: '0',
              fontWeight: currentPage === 'about' ? '500' : '400'
            }}
          >
            About
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              color: '#000000',
              cursor: 'pointer',
              padding: '0',
              fontWeight: currentPage === 'contact' ? '500' : '400'
            }}
          >
            Contact
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            color: '#000000',
            cursor: 'pointer',
            padding: '0'
          }}>
            Log In
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>
            <ShoppingBag size={24} color="#000000" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderTop: '1px solid #E5E5E5' }} className="mobile-menu">
          <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Home</button>
          <button onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Shop All</button>
          <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>About</button>
          <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 0', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Contact</button>
        </div>
      )}
    </nav>
  );

  // Product Card - Exact Wix style
  const ProductCard = ({ product }) => (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ 
        position: 'relative',
        marginBottom: '15px',
        overflow: 'hidden',
        backgroundColor: '#F5F5F5'
      }}>
        <img 
          src={product.image}
          alt={product.name}
          style={{ width: '100%', display: 'block', height: 'auto' }}
        />
        <button style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          backgroundColor: '#FFFFFF',
          color: '#000000',
          border: 'none',
          padding: '10px 20px',
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Quick View
        </button>
      </div>
      <div style={{ textAlign: 'left' }}>
        <h3 style={{
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          marginBottom: '8px',
          color: '#000000'
        }}>
          {product.name}
        </h3>
        <p style={{
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          fontSize: '16px',
          color: '#000000',
          margin: '0'
        }}>
          Price<br/>₹{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );

  // HomePage - Exact Wix layout
  const HomePage = () => (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section - Exact Wix style */}
      <section style={{
        backgroundColor: '#FFF8F0',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <img 
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop"
            alt="Handicrafts"
            style={{ width: '100%', maxWidth: '400px', marginBottom: '40px' }}
          />
          <h1 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '48px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: '30px',
            color: '#000000',
            lineHeight: '1.2'
          }}>
            DISCOVER EXQUISITE HANDICRAFTS
          </h1>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            lineHeight: '1.7',
            marginBottom: '40px',
            color: '#000000',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Immerse yourself in a world of exquisite handicrafts that embody the rich cultural heritage of India. Our curated collection showcases the artistic prowess of rural married women, offering unique and authentic pieces waiting to be explored.
          </p>
          <button 
            onClick={() => setCurrentPage('shop')}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: '15px 40px',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '500',
              letterSpacing: '0.05em'
            }}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#000000'
          }}>
            PRODUCTS
          </h2>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <button 
              onClick={() => setCurrentPage('shop')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                color: '#000000',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Browse Collection
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <img 
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop"
              alt="Our Vision"
              style={{ width: '100%', display: 'block' }}
            />
            <p style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              marginTop: '10px',
              color: '#666666'
            }}>
              Our Vision
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '36px',
              fontWeight: '300',
              letterSpacing: '0.1em',
              marginBottom: '25px',
              color: '#000000'
            }}>
              ABOUT KUSURIMANE
            </h2>
            <p style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              lineHeight: '1.7',
              marginBottom: '30px',
              color: '#000000'
            }}>
              At KusuriMane, we empower rural married women to produce high-quality handicrafts, providing them with a sustainable source of income. Our platform celebrates their artistry and dedication, offering a glimpse into their inspiring stories and traditional craftsmanship.
            </p>
            <button 
              onClick={() => setCurrentPage('about')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                color: '#000000',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '0'
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: '10px',
            color: '#000000'
          }}>
            GALLERY
          </h2>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            marginBottom: '20px',
            color: '#000000'
          }}>
            Artisanal Creations
          </p>
          <button 
            onClick={() => setCurrentPage('shop')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              color: '#000000',
              cursor: 'pointer',
              textDecoration: 'underline',
              marginBottom: '60px'
            }}
          >
            Shop Now
          </button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginTop: '40px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <img 
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop"
                alt="Traditional Crafts"
                style={{ width: '100%', marginBottom: '20px' }}
              />
              <h3 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '10px',
                color: '#000000'
              }}>
                Traditional Crafts
              </h3>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Embrace Tradition
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Embark on a journey through the world of traditional crafts, each piece reflecting the timeless techniques and cultural significance. Discover the beauty of age-old art forms reimagined for the modern world.
              </p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <img 
                src="https://images.unsplash.com/photo-1566054531356-e8b8c50b1e7c?w=400&h=300&fit=crop"
                alt="Contemporary Designs"
                style={{ width: '100%', marginBottom: '20px' }}
              />
              <h3 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '10px',
                color: '#000000'
              }}>
                Contemporary Designs
              </h3>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Exploring Modernity
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Experience the fusion of tradition and innovation in our collection of contemporary designs. Each piece represents a harmonious blend of heritage and modernity, crafted with a touch of elegance and creativity.
              </p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <img 
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=300&fit=crop"
                alt="Empowering Artisans"
                style={{ width: '100%', marginBottom: '20px' }}
              />
              <h3 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '10px',
                color: '#000000'
              }}>
                Empowering Artisans
              </h3>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Celebrating Creativity
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Celebrate the spirit of creativity and resilience as you explore the stories behind the artisans. Their dedication and talent shine through each masterpiece, creating a bond between the creator and the connoisseur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: '10px',
            color: '#000000'
          }}>
            FAQ
          </h2>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            marginBottom: '60px',
            color: '#000000'
          }}>
            Common Questions
          </p>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#666666',
            marginBottom: '60px'
          }}>
            Find answers to frequently asked questions about our handicrafts, the artisans, and the purchasing process.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            textAlign: 'left'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '20px',
                fontWeight: '400',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Shipping and Delivery
              </h3>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Experience seamless and reliable shipping for your chosen handicrafts, ensuring they reach you in pristine condition. Stay updated with convenient tracking details.
              </p>
            </div>

            <div>
              <h3 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '20px',
                fontWeight: '400',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Returns and Exchanges
              </h3>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Your satisfaction is our priority. Explore our hassle-free return and exchange policies if you need to make changes to your purchase.
              </p>
            </div>

            <div>
              <h3 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '20px',
                fontWeight: '400',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Craftsmanship Authenticity
              </h3>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#666666'
              }}>
                Discover the authenticity of each handcrafted piece, accompanied by detailed insights into the artisan's heritage, techniques, and inspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Offers Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: '10px',
            color: '#000000'
          }}>
            EXCLUSIVE OFFERS
          </h2>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            marginBottom: '20px',
            color: '#000000'
          }}>
            Special Deals Await
          </p>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            lineHeight: '1.7',
            marginBottom: '30px',
            color: '#666666'
          }}>
            Don't miss out on our exclusive offers and limited-time deals. Embrace the beauty of Indian handicrafts with special prices that await your discerning choice.
          </p>
          <button 
            onClick={() => setCurrentPage('shop')}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: '15px 40px',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Discover Deals
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '36px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginBottom: '60px',
            color: '#000000'
          }}>
            GET IN TOUCH
          </h2>
          
          <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  First name*
                </label>
                <input 
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #CCCCCC',
                    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  color: '#000000',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                  Last name*
                </label>
                <input 
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #CCCCCC',
                    fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#000000',
                display: 'block',
                marginBottom: '8px'
              }}>
                Email*
              </label>
              <input 
                type="email"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #CCCCCC',
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#000000',
                display: 'block',
                marginBottom: '8px'
              }}>
                Phone
              </label>
              <input 
                type="tel"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #CCCCCC',
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#000000',
                display: 'block',
                marginBottom: '8px'
              }}>
                Message
              </label>
              <textarea 
                rows="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #CCCCCC',
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button 
              type="submit"
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: 'none',
                padding: '15px 40px',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: '500',
                width: '100%'
              }}
            >
              Submit
            </button>
          </form>

          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#666666',
            marginTop: '30px',
            textAlign: 'center'
          }}>
            Have a query or feedback? We're here to assist. Reach out to our team, and we'll ensure your inquiries are addressed with care.
          </p>
        </div>
      </section>
    </div>
  );

  // Shop Page - Exact Wix layout
  const ShopPage = () => (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '40px' }}>
          <span 
            onClick={() => setCurrentPage('home')}
            style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#000000',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Home
          </span>
          <span style={{ margin: '0 10px', color: '#666666' }}>/</span>
          <span style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '14px',
            color: '#666666'
          }}>
            All Products
          </span>
        </div>

        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          {/* Sidebar */}
          <div style={{ flex: '0 0 250px', minWidth: '250px' }}>
            <h3 style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '20px',
              color: '#000000'
            }}>
              Browse by
            </h3>
            <div style={{ marginBottom: '40px' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ marginBottom: '12px' }}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                      fontSize: '16px',
                      color: selectedCategory === cat.id ? '#000000' : '#666666',
                      cursor: 'pointer',
                      fontWeight: selectedCategory === cat.id ? '500' : '400',
                      padding: '0',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    {cat.name}
                  </button>
                </div>
              ))}
            </div>

            <h3 style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '20px',
              color: '#000000'
            }}>
              Filter by
            </h3>
            <div>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '10px',
                color: '#000000'
              }}>
                Price
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#666666',
                marginBottom: '10px'
              }}>
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
              <input
                type="range"
                min="45"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([45, parseInt(e.target.value)])}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Products */}
          <div style={{ flex: '1' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '36px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                marginBottom: '20px',
                color: '#000000'
              }}>
                All Products
              </h1>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#666666',
                maxWidth: '700px'
              }}>
                This is your category description. It's a great place to tell customers what this category is about, connect with your audience and draw attention to your products.
              </p>
            </div>

            <p style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#666666',
              marginBottom: '30px'
            }}>
              {filteredProducts.length} products
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '40px'
            }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // About Page - Exact Wix layout
  const AboutPage = () => (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '48px',
            fontWeight: '300',
            letterSpacing: '0.1em',
            marginBottom: '30px',
            color: '#000000'
          }}>
            EXPLORE KusuriMane
          </h1>
          <p style={{
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#000000',
            marginBottom: '40px'
          }}>
            Discover the vibrant world of KusuriMane, where rural married women from India showcase their exquisite handmade handicrafts. Our curated selection showcases a diverse range of traditional and contemporary handicrafts, each piece reflecting the rich cultural heritage and artistic skills of the artisans.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 20px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=700&fit=crop"
                alt="Our Mission"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <div>
              <h2 style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '36px',
                fontWeight: '300',
                letterSpacing: '0.1em',
                marginBottom: '15px',
                color: '#000000'
              }}>
                Our Mission
              </h2>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '18px',
                fontWeight: '500',
                marginBottom: '25px',
                color: '#000000'
              }}>
                Empowering Artisans
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '20px'
              }}>
                At KusuriMane, our mission is to empower rural married women in India by providing them with a platform to showcase their artistic talents and earn a sustainable livelihood through their handicrafts.
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '20px'
              }}>
                We aim to connect customers with the authentic Indian craftsmanship, enabling them to support and appreciate the skills of these talented artisans.
              </p>
              <p style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.7',
                color: '#666666',
                marginBottom: '30px'
              }}>
                Through our platform, we offer a seamless and immersive shopping experience, allowing customers to explore the cultural significance of each handicraft and its impact on the livelihood of the artisans. Join us in empowering rural artisans and celebrating the beauty of Indian handicrafts.
              </p>
              <button 
                onClick={() => setCurrentPage('contact')}
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '15px 40px',
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Contact Us
              </button>
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
        <h1 style={{
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          fontSize: '48px',
          fontWeight: '300',
          letterSpacing: '0.1em',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#000000'
        }}>
          GET IN TOUCH
        </h1>
        
        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', subscribe: false }); }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#000000',
                display: 'block',
                marginBottom: '8px'
              }}>
                First name*
              </label>
              <input 
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #CCCCCC',
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
            <div>
              <label style={{
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                color: '#000000',
                display: 'block',
                marginBottom: '8px'
              }}>
                Last name*
              </label>
              <input 
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #CCCCCC',
                  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#000000',
              display: 'block',
              marginBottom: '8px'
            }}>
              Email*
            </label>
            <input 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #CCCCCC',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#000000',
              display: 'block',
              marginBottom: '8px'
            }}>
              Phone
            </label>
            <input 
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #CCCCCC',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                boxSizing: 'border-box',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#000000',
              display: 'block',
              marginBottom: '8px'
            }}>
              Message
            </label>
            <textarea 
              rows="6"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #CCCCCC',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
                fontSize: '14px',
                boxSizing: 'border-box',
                resize: 'vertical',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: 'none',
              padding: '15px 40px',
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '500',
              width: '100%'
            }}
          >
            Submit
          </button>
        </form>

        <p style={{
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#666666',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          Have a query or feedback? We're here to assist. Reach out to our team, and we'll ensure your inquiries are addressed with care.
        </p>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '60px 20px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <h3 style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '20px',
              fontWeight: '400',
              marginBottom: '15px'
            }}>
              Kusuri Mane
            </h3>
            <p style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#CCCCCC'
            }}>
              8971192840<br/>
              kusurimane.com<br/>
              Jayanagar, Bangalore, Karnataka
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #333333', paddingTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <button style={{ background: 'none', border: 'none', color: '#CCCCCC', cursor: 'pointer', fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: '14px', padding: '0' }}>Privacy Policy</button>
              <button style={{ background: 'none', border: 'none', color: '#CCCCCC', cursor: 'pointer', fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: '14px', padding: '0' }}>Accessibility Statement</button>
              <button style={{ background: 'none', border: 'none', color: '#CCCCCC', cursor: 'pointer', fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: '14px', padding: '0' }}>Shipping Policy</button>
              <button style={{ background: 'none', border: 'none', color: '#CCCCCC', cursor: 'pointer', fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: '14px', padding: '0' }}>Terms & Conditions</button>
              <button style={{ background: 'none', border: 'none', color: '#CCCCCC', cursor: 'pointer', fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: '14px', padding: '0' }}>Refund Policy</button>
            </div>
            <p style={{
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#CCCCCC',
              margin: '0'
            }}>
              © 2025 by KusuriMane.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Avenir, Helvetica, Arial, sans-serif' }}>
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      <Footer />
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default KusuriManeExact;