import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = ({ setCurrentPage, cart }) => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xl font-light tracking-widest hover:opacity-70 transition-opacity"
            >
              Kusuri Mane
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <button
                onClick={() => setCurrentPage('shop')}
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Shop All
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className="text-sm hover:opacity-70 transition-opacity"
              >
                About
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Contact
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              {/* Cart */}
              <button
                onClick={() => setCurrentPage('cart')}
                className="relative hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-sm">
                    {user.name}
                  </span>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => setCurrentPage('admin')}
                      className="text-sm underline hover:no-underline"
                    >
                      Dashboard
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="text-sm underline hover:no-underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="hidden md:block text-sm hover:opacity-70 transition-opacity"
                >
                  Log In
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden py-6 border-t">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => { setCurrentPage('home'); setMenuOpen(false); }}
                  className="text-left text-sm hover:opacity-70 transition-opacity"
                >
                  Home
                </button>
                <button
                  onClick={() => { setCurrentPage('shop'); setMenuOpen(false); }}
                  className="text-left text-sm hover:opacity-70 transition-opacity"
                >
                  Shop All
                </button>
                <button
                  onClick={() => { setCurrentPage('about'); setMenuOpen(false); }}
                  className="text-left text-sm hover:opacity-70 transition-opacity"
                >
                  About
                </button>
                <button
                  onClick={() => { setCurrentPage('contact'); setMenuOpen(false); }}
                  className="text-left text-sm hover:opacity-70 transition-opacity"
                >
                  Contact
                </button>
                {user ? (
                  <>
                    <div className="pt-4 border-t space-y-3">
                      <p className="text-sm">{user.name}</p>
                      {user.role === 'admin' && (
                        <button
                          onClick={() => { setCurrentPage('admin'); setMenuOpen(false); }}
                          className="block text-left text-sm underline hover:no-underline"
                        >
                          Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => { logout(); setMenuOpen(false); }}
                        className="block text-left text-sm underline hover:no-underline"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => { setShowAuthModal(true); setMenuOpen(false); }}
                    className="text-left text-sm hover:opacity-70 transition-opacity"
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
