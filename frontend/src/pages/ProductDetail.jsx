import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import Header from '../components/Header';

const API_BASE = 'http://localhost:5000/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItemToCart = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data);
      } else {
        setError(data.message || 'Product not found');
      }
    } catch {
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItemToCart({
      id: product._id,
      name: product.name,
      price: product.price_per_unit,
      image: product.images?.[0] || '',
      unit: product.unit,
      farmName: product.farm_name,
      freshness: product.freshness_score,
    }, quantity);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(''), 3000);
    openCart();
  };

  const getFreshnessColor = (score) => {
    if (score >= 80) return '#16a34a';
    if (score >= 60) return '#d97706';
    if (score >= 40) return '#ea580c';
    return '#dc2626';
  };

  const getFreshnessLabel = (score) => {
    if (score >= 80) return 'Very Fresh';
    if (score >= 60) return 'Fresh';
    if (score >= 40) return 'Moderate';
    return 'Declining';
  };

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ height: '500px', borderRadius: '24px', background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>
              {[80, 50, 60, 30, 90].map((w, i) => (
                <div key={i} style={{ height: i === 0 ? '40px' : '18px', width: `${w}%`, borderRadius: '8px', background: '#f0f0f0' }} />
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }`}</style>
      </div>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '1rem', padding: '2rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#d1d5db' }}>search_off</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Product Not Found</h2>
          <p style={{ color: '#6b7280', margin: 0 }}>{error || 'This product may have been removed or is unavailable.'}</p>
          <Link to="/products" style={{ background: '#1e5631', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // ── Product detail ───────────────────────────────────────────────────────
  const images = product.images?.length ? product.images : ['https://via.placeholder.com/600x500?text=No+Image'];
  const score = product.freshness_score || 0;
  const freshnessColor = getFreshnessColor(score);
  const freshnessLabel = getFreshnessLabel(score);
  const discount = product.mrp_per_unit > product.price_per_unit
    ? Math.round(((product.mrp_per_unit - product.price_per_unit) / product.mrp_per_unit) * 100)
    : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', background: '#1e5631', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px', animation: 'slideIn 0.3s ease' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span> {toast}
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
          <Link to="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>Products</Link>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
          <span style={{ color: '#111827', fontWeight: 600 }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Images */}
          <div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '460px', marginBottom: '1rem', position: 'relative' }}>
              <img
                src={images[selectedImage]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Freshness badge */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: freshnessColor, color: '#fff', padding: '6px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '10px' }}>●</span> {score} · {freshnessLabel}
              </div>
              {discount > 0 && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#1e5631', color: '#fff', padding: '6px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
                  {discount}% OFF
                </div>
              )}
              {product.is_organic && (
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(255,255,255,0.95)', color: '#166534', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>eco</span> Organic
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    style={{ width: '72px', height: '72px', borderRadius: '12px', overflow: 'hidden', border: selectedImage === i ? '3px solid #1e5631' : '2px solid #e5e7eb', cursor: 'pointer', padding: 0 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Farm */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1e5631', fontSize: '0.85rem', fontWeight: 600 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>verified</span>
              {product.farm_name} · {product.farm_district}
            </div>

            {/* Name */}
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827', margin: 0, lineHeight: 1.2 }}>{product.name}</h1>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.75rem', color: '#1e5631', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '4px 10px', borderRadius: '999px', fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827' }}>₹{product.price_per_unit}</span>
              <span style={{ fontSize: '1rem', color: '#6b7280' }}>/ {product.unit}</span>
              {discount > 0 && (
                <span style={{ fontSize: '1rem', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.mrp_per_unit}</span>
              )}
            </div>

            {/* Freshness widget */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Farmiva Freshness Score</p>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>Based on harvest time, storage & farmer rating</p>
                </div>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: freshnessColor }}>{score}</span>
              </div>
              <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${score}%`, background: freshnessColor, borderRadius: '999px', transition: 'width 0.6s ease' }} />
              </div>
            </div>

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { icon: 'location_on',    label: 'District',   value: product.farm_district || '—' },
                { icon: 'straighten',     label: 'Unit',       value: product.unit || '—' },
                { icon: 'schedule',       label: 'Category',   value: product.category || '—' },
                { icon: 'star',           label: 'Rating',     value: product.rating > 0 ? `${product.rating} (${product.reviews_count} reviews)` : 'No reviews yet' },
              ].map((d) => (
                <div key={d.label} style={{ background: '#fff', borderRadius: '12px', padding: '0.85rem 1rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#1e5631' }}>{d.icon}</span> {d.label}
                  </p>
                  <p style={{ margin: '4px 0 0', fontWeight: 700, color: '#111827', fontSize: '0.88rem' }}>{d.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.description && (
              <p style={{ color: '#4b5563', lineHeight: 1.7, margin: 0, fontSize: '0.92rem' }}>{product.description}</p>
            )}

            {/* Add to cart */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '0.5rem' }}>
              {/* Quantity stepper */}
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden', height: '52px' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '48px', height: '100%', border: 'none', background: '#f9fafb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>remove</span>
                </button>
                <span style={{ width: '48px', textAlign: 'center', fontWeight: 800, fontSize: '1.05rem', color: '#111827' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '48px', height: '100%', border: 'none', background: '#f9fafb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                </button>
              </div>

              {/* Add to Cart button */}
              <button onClick={handleAddToCart}
                style={{ flex: 1, height: '52px', background: 'linear-gradient(135deg, #1e5631, #2d6a4f)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(30,86,49,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,86,49,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,86,49,0.3)'; }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#fff" d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85"/></svg>
                Add to Cart — ₹{(product.price_per_unit * quantity).toFixed(0)}
              </button>
            </div>

            {/* Checkout link */}
            <button onClick={() => { handleAddToCart(); setTimeout(() => navigate('/checkout'), 100); }}
              style={{ width: '100%', height: '48px', background: '#fff', color: '#1e5631', border: '2px solid #1e5631', borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'background 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f0fdf4'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>bolt</span>
              Buy Now
            </button>

            {/* Trust badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.78rem', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#1e5631' }}>verified</span>
              <span>Verified Farm Direct</span>
              <span>·</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#1e5631' }}>agriculture</span>
              <span>No Middlemen</span>
              <span>·</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#1e5631' }}>local_shipping</span>
              <span>Doorstep Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;
