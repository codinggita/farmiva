import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [pincode, setPincode] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Organic Tomatoes", location: "Nashik Farms", price: "₹45/kg", freshness: 98, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Fresh Spinach", location: "Ooty Organics", price: "₹30/bunch", freshness: 92, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Sweet Carrots", location: "Punjab Harvest", price: "₹50/kg", freshness: 85, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Crisp Bell Peppers", location: "Munnar Greens", price: "₹120/kg", freshness: 95, image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  ];

  const getFreshnessColor = (score) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface antialiased flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-surface-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva Logo" className="h-14 md:h-20 w-auto drop-shadow-md" />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <Link to="/login" className="hover:text-primary transition-colors">Log In</Link>
            <Link to="/signup" className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">Sign Up</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-on-surface-variant"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-surface-variant px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-primary">How it works</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-primary">Products</a>
            <div className="pt-4 border-t border-surface-variant flex flex-col gap-3">
              <Link to="/login" className="text-center py-3 rounded-xl font-medium border border-surface-variant">Log In</Link>
              <Link to="/signup" className="text-center py-3 rounded-xl font-medium bg-primary text-white">Sign Up</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-6 pb-20 lg:pt-10 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Fresh from the source
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
                  Farm-fresh, <br className="hidden lg:block"/>
                  <span className="text-primary relative inline-block">
                    at your door
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                    </svg>
                  </span>
                </h1>
                
                <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
                  Experience the taste of real, locally sourced produce. We bridge the gap between rural farmers and your kitchen table.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
                    </div>
                    <input 
                      type="text" 
                      className="block w-full pl-11 pr-4 py-3.5 border border-surface-variant rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter your zip code"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (pincode.trim()) {
                        navigate('/products');
                      }
                    }}
                    className="whitespace-nowrap px-6 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 hover:shadow-md transition-all active:scale-95"
                  >
                    Find Produce
                  </button>
                </div>

                {/* Trust Strip */}
                <div className="pt-6 border-t border-surface-variant/60">
                  <div className="grid grid-cols-2 sm:grid-cols-3 border border-[#e5e5e0] rounded-2xl overflow-hidden bg-white w-full max-w-[680px]">
                    <div className="py-5 md:py-7 px-4 md:px-5 text-center border-b sm:border-b-0 sm:border-r border-[#e5e5e0]">
                      <div className="text-2xl md:text-[32px] font-semibold text-[#1a1a1a] leading-none tracking-[-0.5px]">10K+</div>
                      <span className="block w-6 h-[3px] rounded-sm mx-auto mt-2.5 bg-[#EF9F27]"></span>
                      <div className="text-xs md:text-[13px] text-[#6b6b6b] mt-2.5 leading-[1.4]">happy customers</div>
                    </div>
                    <div className="py-5 md:py-7 px-4 md:px-5 text-center border-b sm:border-b-0 sm:border-r border-[#e5e5e0]">
                      <div className="text-2xl md:text-[32px] font-semibold text-[#1a1a1a] leading-none tracking-[-0.5px]">50+</div>
                      <span className="block w-6 h-[3px] rounded-sm mx-auto mt-2.5 bg-[#1D9E75]"></span>
                      <div className="text-xs md:text-[13px] text-[#6b6b6b] mt-2.5 leading-[1.4]">cities delivering</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 py-5 md:py-7 px-4 md:px-5 text-center sm:border-r-0 border-[#e5e5e0]">
                      <div className="text-2xl md:text-[32px] font-semibold text-[#1a1a1a] leading-none tracking-[-0.5px]">100%</div>
                      <span className="block w-6 h-[3px] rounded-sm mx-auto mt-2.5 bg-[#639922]"></span>
                      <div className="text-xs md:text-[13px] text-[#6b6b6b] mt-2.5 leading-[1.4]">fresh guarantee</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                  <div className="absolute inset-0 bg-primary/5 rounded-[40px] transform rotate-3 scale-105"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Fresh vegetables in crate" 
                    className="relative rounded-[32px] w-full h-full object-cover shadow-2xl z-10"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16 bg-white border-y border-surface-variant/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <h3 className="font-bold text-lg text-on-surface mb-2">AI Freshness</h3>
                <p className="text-on-surface-variant text-sm">Predicted peak ripeness</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="font-bold text-lg text-on-surface mb-2">Damage-proof</h3>
                <p className="text-on-surface-variant text-sm">Secure transit packaging</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-500 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">storefront</span>
                </div>
                <h3 className="font-bold text-lg text-on-surface mb-2">Rural Hub</h3>
                <p className="text-on-surface-variant text-sm">Empowering local hubs</p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-500 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">handshake</span>
                </div>
                <h3 className="font-bold text-lg text-on-surface mb-2">Direct from Farmers</h3>
                <p className="text-on-surface-variant text-sm">No middleman markup</p>
              </div>

            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="products" className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-on-surface mb-2 tracking-tight">Harvested Today</h2>
                <p className="text-on-surface-variant text-lg">The freshest picks from our local network</p>
              </div>
              <Link to="/products" className="hidden sm:inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group">
                View all <span className="material-symbols-outlined text-lg ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-[12px] overflow-hidden border border-surface-variant/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm flex items-center gap-1 ${getFreshnessColor(product.freshness)}`}>
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                      {product.freshness}% Fresh
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg text-on-surface mb-1">{product.name}</h3>
                    <div className="flex items-center text-on-surface-variant text-sm mb-4">
                      <span className="material-symbols-outlined text-[16px] mr-1">pin_drop</span>
                      {product.location}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-on-surface">{product.price}</span>
                      <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors active:scale-95">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link to="/products" className="inline-flex items-center justify-center w-full px-6 py-3 border border-surface-variant rounded-xl font-medium text-primary hover:bg-primary/5 transition-colors">
                View all products
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 lg:py-28 bg-white border-y border-surface-variant/40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 tracking-tight">Farm to Fork, Simplified</h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">We've streamlined the agricultural supply chain to bring you the best.</p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-surface-variant -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                
                <div className="flex flex-col items-center text-center bg-white md:bg-transparent">
                  <div className="w-20 h-20 bg-white border-4 border-surface-variant rounded-full flex items-center justify-center mb-6 shadow-sm relative group">
                    <div className="absolute inset-0 rounded-full border-4 border-primary scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">travel_explore</span>
                  </div>
                  <h3 className="font-bold text-xl text-on-surface mb-3">1. Browse Local</h3>
                  <p className="text-on-surface-variant">Discover seasonal produce within an 80-km radius of your location.</p>
                </div>

                <div className="flex flex-col items-center text-center bg-white md:bg-transparent">
                  <div className="w-20 h-20 bg-white border-4 border-surface-variant rounded-full flex items-center justify-center mb-6 shadow-sm relative group">
                    <div className="absolute inset-0 rounded-full border-4 border-accent scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-accent transition-colors">shopping_bag</span>
                  </div>
                  <h3 className="font-bold text-xl text-on-surface mb-3">2. Order Fresh</h3>
                  <p className="text-on-surface-variant">Farmers harvest only what is ordered, eliminating food waste entirely.</p>
                </div>

                <div className="flex flex-col items-center text-center bg-white md:bg-transparent">
                  <div className="w-20 h-20 bg-white border-4 border-surface-variant rounded-full flex items-center justify-center mb-6 shadow-sm relative group">
                    <div className="absolute inset-0 rounded-full border-4 border-green-500 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-green-500 transition-colors">local_shipping</span>
                  </div>
                  <h3 className="font-bold text-xl text-on-surface mb-3">3. Delivered Direct</h3>
                  <p className="text-on-surface-variant">Delivered within 48 hours in secure, temperature-controlled packaging.</p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva Logo" className="h-20 w-auto drop-shadow-md bg-white/5 rounded-2xl" />
              </div>
              <p className="text-gray-400 max-w-sm">
                © 2026 Farmiva. Precision agriculture for a sustainable future.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
