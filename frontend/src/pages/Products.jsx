import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import useCartStore from '../store/cartStore';

const API_BASE = 'http://localhost:5000/api';

const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Pantry', 'Bakery', 'Herbs'];

const sortOptions = [
  { label: 'Freshest First', value: 'freshness_score' },
  { label: 'Price: Low to High', value: 'price_per_unit', order: 'asc' },
  { label: 'Price: High to Low', value: 'price_per_unit', order: 'desc' },
  { label: 'Newest', value: 'createdAt' },
];

function getFreshnessColor(score) {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#d97706';
  if (score >= 40) return '#ea580c';
  return '#dc2626';
}

function getFreshnessLabel(score) {
  if (score >= 80) return 'Very Fresh';
  if (score >= 60) return 'Fresh';
  if (score >= 40) return 'Moderate';
  return 'Declining';
}

function ProductCard({ product, onAddToCart }) {
  const score = product.freshness_score || 0;
  const color = getFreshnessColor(score);
  const label = getFreshnessLabel(score);
  const discount = product.mrp_per_unit > product.price_per_unit
    ? Math.round(((product.mrp_per_unit - product.price_per_unit) / product.mrp_per_unit) * 100)
    : 0;

  return (
    <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)'; }}
    >
      {/* Image */}
      <div style={{ position: 'relative' }}>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        </Link>

        {/* Freshness Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: color, color: '#fff', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '10px' }}>●</span> {score} · {label}
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#1e5631', color: '#fff', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
            {discount}% OFF
          </div>
        )}

        {/* Organic Badge */}
        {product.is_organic && (
          <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.9)', color: '#166534', padding: '3px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined text-[12px]">eco</span> Organic
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {/* Farm info */}
        <p style={{ fontSize: '0.72rem', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="material-symbols-outlined text-[14px]" style={{ color: '#1e5631' }}>agriculture</span>
          {product.farm_name} · {product.farm_district}
        </p>

        {/* Name */}
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.3 }}>{product.name}</h3>
        </Link>

        {/* Distance & rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {product.distance && (
            <span style={{ fontSize: '0.72rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span className="material-symbols-outlined text-[14px]">location_on</span> {product.distance}
            </span>
          )}
          {product.rating > 0 && (
            <span style={{ fontSize: '0.72rem', color: '#92400e', background: '#fef3c7', padding: '1px 6px', borderRadius: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span className="material-symbols-outlined text-[12px]">star</span> {product.rating} ({product.reviews_count})
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontSize: '0.65rem', color: '#1e5631', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '2px 7px', borderRadius: '999px', fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + Cart Button */}
        <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>
              ₹{product.price_per_unit}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#6b7280', marginLeft: '4px' }}>
              /{product.unit}
            </span>
            {discount > 0 && (
              <div style={{ fontSize: '0.72rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                ₹{product.mrp_per_unit}
              </div>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            style={{ background: '#1e5631', color: '#fff', border: 'none', borderRadius: '12px', padding: '8px 16px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#166d3b'}
            onMouseLeave={e => e.currentTarget.style.background = '#1e5631'}
          >
            <span style={{ fontSize: '16px' }}>+</span> Add
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
      <div style={{ height: '200px', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '6px', width: '60%' }} />
        <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '6px', width: '80%' }} />
        <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '6px', width: '40%' }} />
        <div style={{ height: '36px', background: '#f0f0f0', borderRadius: '12px' }} />
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('freshness_score');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isOrganic, setIsOrganic] = useState(false);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState('');

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      if (search) params.set('search', search);
      if (isOrganic) params.set('is_organic', 'true');
      params.set('sort', sortBy);
      params.set('limit', '24');

      const res = await fetch(`${API_BASE}/products?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } else {
        setError(data.message || 'Failed to load products');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, search, isOrganic]);

  const handleAddToCart = (product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price_per_unit,
      image: product.images?.[0] || '',
      unit: product.unit,
      farmName: product.farm_name,
      freshness: product.freshness_score,
    });
    openCart();
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', background: '#1e5631', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', animation: 'slideIn 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined text-[20px]">check_circle</span> {toast}
        </div>
      )}

      {/* Hero strip */}
      <div style={{ background: 'linear-gradient(135deg, #1e5631, #2d6a4f)', color: '#fff', padding: '2.5rem 2rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Farm-Fresh Marketplace</h1>
        <p style={{ margin: '0 0 1.5rem', opacity: 0.85, fontSize: '1rem' }}>
          {total > 0 ? `${total} products available from local farms` : 'Fresh from local farms to your door'}
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '8px' }}>
          <input
            type="text"
            placeholder="Search products, farms, or districts..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: 'none', fontSize: '0.9rem', outline: 'none' }}
          />
          <button type="submit" style={{ background: '#a3e635', color: '#1a3a1a', border: 'none', borderRadius: '12px', padding: '12px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Search
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Filters Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: selectedCategory === cat ? '2px solid #1e5631' : '2px solid #e5e7eb',
                  background: selectedCategory === cat ? '#1e5631' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#374151',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={isOrganic} onChange={e => setIsOrganic(e.target.checked)} />
              <span className="material-symbols-outlined text-[18px] text-green-700">eco</span> Organic only
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: '10px', border: '2px solid #e5e7eb', fontSize: '0.82rem', fontWeight: 600, color: '#374151', background: '#fff', cursor: 'pointer', outline: 'none' }}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        {search && (
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.9rem', color: '#374151' }}>
              Results for <strong>"{search}"</strong> — {total} found
            </span>
            <button onClick={() => { setSearch(''); setSearchInput(''); }} style={{ background: 'none', border: 'none', color: '#1e5631', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'underline' }}>
              Clear
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem 1.5rem', color: '#dc2626', marginBottom: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined text-[20px]">error</span> {error}
          </div>
        )}

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.length === 0
            ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
                <div style={{ marginBottom: '1rem' }}><span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#9ca3af' }}>search_off</span></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem' }}>No products found</h3>
                <p style={{ margin: '0 0 1rem' }}>Try a different category or search term</p>
                <button onClick={() => { setSelectedCategory('All'); setSearch(''); setSearchInput(''); }} style={{ background: '#1e5631', color: '#fff', border: 'none', borderRadius: '12px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
                  Browse All Products
                </button>
              </div>
            )
            : products.map(product => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))
          }
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Products;
