import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { mockProducts } from '../utils/mockData';
import useCartStore from '../store/cartStore';

const categories = ['All Produce', 'Fruits', 'Vegetables', 'Dairy', 'Pantry', 'Bakery'];

function Products() {
  const [activeCategory, setActiveCategory] = useState('All Produce');
  const addItemToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const filtered = activeCategory === 'All Produce'
    ? mockProducts
    : mockProducts.filter((p) => p.category === activeCategory);

  const getFreshnessColor = (score) => {
    if (score >= 80) return '#2d6a4f';
    if (score >= 50) return '#e6a817';
    return '#ba1a1a';
  };

  return (
    <div style={{ backgroundColor: '#f9f6f0', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      <Header />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e5631', marginBottom: '0.5rem' }}>
            Today's Harvest
          </h1>
          <p style={{ fontSize: '1rem', color: '#555', margin: 0 }}>
            Organic produce picked at peak ripeness, delivered within hours.
          </p>
        </div>

        {/* Filters Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.4rem 1.1rem',
                  borderRadius: '999px',
                  border: activeCategory === cat ? 'none' : '1.5px solid #ccc',
                  backgroundColor: activeCategory === cat ? '#1e5631' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#333',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666' }}>Sort by</span>
            <select style={{
              border: '1.5px solid #ccc',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#1a1a1a',
              backgroundColor: '#fff',
              cursor: 'pointer',
              outline: 'none',
            }}>
              <option>Most Fresh</option>
              <option>Price: Low to High</option>
              <option>Distance: Nearest</option>
              <option>Popularity</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: '#1e5631' }}>{filtered.length}</strong> products
        </p>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.13)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </Link>

                {/* Freshness Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  backgroundColor: getFreshnessColor(product.freshness),
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {product.freshness}% Fresh
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => { addItemToCart(product); openCart(); }}
                  title="Add to cart"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    color: '#1e5631',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e5631'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.92)'; e.currentTarget.style.color = '#1e5631'; }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_shopping_cart</span>
                </button>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1rem 1.1rem 1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Verified Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1e5631', fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                  Verified Farm
                </div>

                {/* Product Name */}
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 0.2rem', lineHeight: 1.3 }}>
                    {product.name}
                  </h3>
                </Link>

                {/* Farm & Distance */}
                <p style={{ fontSize: '0.78rem', color: '#888', margin: '0 0 0.75rem' }}>
                  {product.farm} &bull; {product.distance}
                </p>

                {/* Freshness Bar */}
                <div style={{ marginBottom: '0.8rem' }}>
                  <div style={{ height: '5px', borderRadius: '999px', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${product.freshness}%`,
                      backgroundColor: getFreshnessColor(product.freshness),
                      borderRadius: '999px',
                    }} />
                  </div>
                </div>

                {/* Price + View Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e5631' }}>
                    {product.price}
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#888', marginLeft: '4px' }}>/ {product.unit}</span>
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#1e5631',
                      textDecoration: 'none',
                      border: '1.5px solid #1e5631',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button style={{
            padding: '0.75rem 2.5rem',
            borderRadius: '12px',
            border: '2px solid #1e5631',
            color: '#1e5631',
            backgroundColor: 'transparent',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e5631'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1e5631'; }}
          >
            Load More Produce
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e5631' }}>Farmiva</span>
            <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginTop: '0.4rem', marginBottom: 0 }}>
              © 2024 Farmiva. All rights reserved.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Sustainability Report', 'Our Farmers', 'Privacy Policy', 'Terms of Service'].map((link) => (
              <a key={link} href="#" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Products;
