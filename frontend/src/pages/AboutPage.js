import React from 'react';

const AboutPage = () => {
  return (
    <div className="fade-in">
      <div className="hero-gradient py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-amber-900 mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kusuri Mane is dedicated to bringing you the finest natural cosmetics, crafted with care and
            love for your skin's health and beauty.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="fade-in">
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We believe that beauty comes from nature. That's why we source only the finest natural
              ingredients to create products that nourish, protect, and enhance your natural beauty.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every product is carefully formulated and tested to ensure it meets our high standards of
              quality and effectiveness. We're committed to cruelty-free practices and sustainable sourcing.
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-96 rounded-3xl flex items-center justify-center shadow-xl">
            <span className="text-8xl">🌸</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-12 md:p-16 shadow-2xl">
          <h2 className="text-4xl font-display font-bold text-center text-gray-800 mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Natural',
                desc: '100% natural ingredients sourced responsibly from trusted suppliers',
                icon: '🌿'
              },
              {
                title: 'Quality',
                desc: 'Rigorous testing and quality control at every step of production',
                icon: '⭐'
              },
              {
                title: 'Sustainable',
                desc: 'Eco-friendly packaging and environmentally conscious practices',
                icon: '♻️'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="text-center fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;