import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { mockProducts } from '../utils/mockData';

function Products() {
  const [activeCategory, setActiveCategory] = useState('All Produce');

  return (
    <div className="bg-background font-sans text-on-background selection:bg-primary/20">
      <Header />

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="py-4 flex items-center gap-2 text-outline text-xs font-medium">
          <span className="text-primary-container font-semibold">Fresh Harvest</span>
        </nav>

        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary tracking-tight">Today's Harvest</h1>
            <p className="text-on-surface-variant text-base mt-2">Organic produce picked at peak ripeness, delivered within hours.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-outline">Sort by</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-outline-variant rounded-lg px-4 py-2 pr-10 text-sm font-semibold text-on-surface focus:ring-primary focus:border-primary cursor-pointer outline-none shadow-sm">
                <option>Most Fresh</option>
                <option>Price: Low to High</option>
                <option>Distance: Nearest</option>
                <option>Popularity</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
            </div>
          </div>
        </header>

        {/* Filters Section */}
        <section className="mb-12 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-on-surface-variant">Categories</span>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md active:scale-95 transition-all">All Produce</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Fruits</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Vegetables</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Dairy &amp; Eggs</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Grains</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Herbs</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-on-surface-variant">Freshness Score</span>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  80%+ Fresh
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  50-79% Ripening
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-on-surface-variant">Distance</span>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors">
                  Under 20km
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors">
                  Next Day Delivery
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={product.image} />
                </Link>
                <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                  {product.tags.map((tag, index) => {
                    // Simple logic to style tags based on content
                    let bgColor = "bg-secondary-container";
                    let textColor = "text-on-secondary-container";
                    if (tag.includes("Fresh")) {
                      bgColor = "bg-primary"; textColor = "text-white";
                    } else if (tag.includes("Ripening")) {
                      bgColor = "bg-[#ba1a1a]"; textColor = "text-white";
                    }
                    return (
                      <span key={index} className={`px-3 py-1 ${bgColor} ${textColor} text-[10px] font-medium rounded-full uppercase tracking-wider`}>
                        {tag}
                      </span>
                    )
                  })}
                </div>
                <button 
                  onClick={() => {
                    addItemToCart(product);
                    // Optional: add a toast here
                  }}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90 z-10"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Verified Farm
                </div>
                <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                  <h3 className="text-xl font-bold text-on-surface mb-1">{product.name}</h3>
                </Link>
                <p className="text-outline text-xs font-medium mb-4">{product.farm} • {product.distance}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}<span className="text-xs font-medium text-outline"> / {product.unit}</span></span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all active:scale-95">
            Load More Produce
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-white dark:bg-stone-950 border-t border-stone-100 dark:border-stone-900">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center px-8 py-12">
          <div className="mb-6 md:mb-0">
            <span className="font-bold text-stone-900 dark:text-white text-xl">Farmiva</span>
            <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">© 2024 Farmiva Organic Modernism. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Sustainability Report</a>
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Our Farmers</a>
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Privacy Policy</a>
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-outline">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] uppercase">Explore</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-outline">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] uppercase">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-outline">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] uppercase">Account</span>
        </button>
      </div>
    </div>
  );
}

export default Products;
