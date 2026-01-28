import React from 'react';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="bg-white">
      {/* Hero Section - Full width with background image */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" 
        style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1920&q=80')"}}>
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-wide">
            DISCOVER EXQUISITE HANDICRAFTS
          </h1>
          <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Immerse yourself in a world of exquisite handicrafts that embody the rich cultural heritage of India. 
            Our curated collection showcases the artistic prowess of rural married women, offering unique and 
            authentic pieces waiting to be explored.
          </p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="bg-white text-black px-12 py-4 text-sm font-medium tracking-widest hover:bg-gray-100 transition-colors">
            Explore Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">PRODUCTS</h2>
            <button 
              onClick={() => setCurrentPage('shop')}
              className="text-sm underline hover:no-underline">
              Browse Collection
            </button>
          </div>

          {/* Products Grid - 6 items in 2 rows */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: 'Traditional Purse', price: '₹60.00', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80' },
              { name: 'Abstract Vivid Forms', price: '₹45.00', img: 'https://images.unsplash.com/photo-1585933646406-2771de13f1c4?w=400&q=80' },
              { name: 'Urban Motion Capture', price: '₹180.00', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80' },
              { name: 'Futuristic City Sunset', price: '₹50.00', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80' },
              { name: "Nature's Abstract Harmony", price: '₹150.00', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80' },
              { name: 'Serene Landscape Vibes', price: '₹200.00', img: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&q=80' }
            ].map((product, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-100">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <button className="absolute top-4 right-4 bg-white px-4 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                  </button>
                </div>
                <h3 className="font-light text-base mb-2">{product.name}</h3>
                <p className="text-sm">Price <span className="font-medium">{product.price}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Two columns */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80" 
                alt="Shop"
                className="w-full h-auto"
              />
              <p className="text-sm mt-4 text-gray-600">Our Vision</p>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">ABOUT KUSURIMANE</h2>
              <p className="text-base leading-relaxed mb-8 font-light">
                At KusuriMane, we empower rural married women to produce high-quality handicrafts, providing them 
                with a sustainable source of income. Our platform celebrates their artistry and dedication, offering 
                a glimpse into their inspiring stories and traditional craftsmanship.
              </p>
              <button 
                onClick={() => setCurrentPage('about')}
                className="border border-black px-10 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - 3 columns */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-2 tracking-wide">GALLERY</h2>
            <p className="text-sm text-gray-600">Artisanal Creations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Column 1 */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80"
                alt="Traditional Crafts"
                className="w-full h-64 object-cover mb-6"
              />
              <h3 className="text-xl font-light mb-2">Traditional Crafts</h3>
              <p className="text-sm font-medium mb-4">Embrace Tradition</p>
              <p className="text-sm leading-relaxed text-gray-700">
                Embark on a journey through the world of traditional crafts, each piece reflecting the timeless 
                techniques and cultural significance. Discover the beauty of age-old art forms reimagined for the modern world.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=600&q=80"
                alt="Contemporary Designs"
                className="w-full h-64 object-cover mb-6"
              />
              <h3 className="text-xl font-light mb-2">Contemporary Designs</h3>
              <p className="text-sm font-medium mb-4">Exploring Modernity</p>
              <p className="text-sm leading-relaxed text-gray-700">
                Experience the fusion of tradition and innovation in our collection of contemporary designs. Each piece 
                represents a harmonious blend of heritage and modernity, crafted with a touch of elegance and creativity.
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1585933646406-2771de13f1c4?w=600&q=80"
                alt="Empowering Artisans"
                className="w-full h-64 object-cover mb-6"
              />
              <h3 className="text-xl font-light mb-2">Empowering Artisans</h3>
              <p className="text-sm font-medium mb-4">Celebrating Creativity</p>
              <p className="text-sm leading-relaxed text-gray-700">
                Celebrate the spirit of creativity and resilience as you explore the stories behind the artisans. 
                Their dedication and talent shine through each masterpiece, creating a bond between the creator and the connoisseur.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-black text-white px-12 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-2 tracking-wide">FAQ</h2>
            <p className="text-sm text-gray-600">Common Questions</p>
            <p className="text-sm mt-4 text-gray-700 max-w-2xl mx-auto">
              Find answers to frequently asked questions about our handicrafts, the artisans, and the purchasing process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {/* FAQ Item 1 */}
            <div>
              <svg className="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              <h3 className="text-lg font-medium mb-3">Shipping and Delivery</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Experience seamless and reliable shipping for your chosen handicrafts, ensuring they reach you in 
                pristine condition. Stay updated with convenient tracking details.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div>
              <svg className="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              <h3 className="text-lg font-medium mb-3">Returns and Exchanges</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your satisfaction is our priority. Explore our hassle-free return and exchange policies if you need 
                to make changes to your purchase.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div>
              <svg className="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <h3 className="text-lg font-medium mb-3">Craftsmanship Authenticity</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Discover the authenticity of each handcrafted piece, accompanied by detailed insights into the artisan's 
                heritage, techniques, and inspiration.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div>
              <svg className="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
              <h3 className="text-lg font-medium mb-3">Special Offers</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Don't miss out on our exclusive offers and limited-time deals. Embrace the beauty of Indian handicrafts 
                with special prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Offers Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">EXCLUSIVE OFFERS</h2>
          <p className="text-xl mb-6">Special Deals Await</p>
          <p className="text-base leading-relaxed mb-10 font-light">
            Don't miss out on our exclusive offers and limited-time deals. Embrace the beauty of Indian handicrafts 
            with special prices that await your discerning choice.
          </p>
          <button 
            onClick={() => setCurrentPage('shop')}
            className="bg-black text-white px-12 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
            Discover Deals
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">GET IN TOUCH</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First name*"
                    required
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name*"
                    required
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email*"
                  required
                  className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-3 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-black text-white px-12 py-3 text-sm font-medium hover:bg-gray-800 transition-colors w-full md:w-auto"
              >
                Submit
              </button>
            </form>

            {/* Contact Text */}
            <div className="md:pl-12">
              <img 
                src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&q=80"
                alt="Contact"
                className="w-full h-48 object-cover mb-6"
              />
              <p className="text-sm leading-relaxed text-gray-700">
                Have a query or feedback? We're here to assist. Reach out to our team, and we'll ensure your inquiries 
                are addressed with care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
