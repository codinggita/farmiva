import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api';

const STATUS_MAP = {
  active:   { label: 'Active',   bg: '#d1fae5', color: '#065f46', icon: 'check_circle' },
  pending:  { label: 'Pending',  bg: '#fef3c7', color: '#92400e', icon: 'pending' },
  paused:   { label: 'Rejected', bg: '#fee2e2', color: '#991b1b', icon: 'cancel' },
  flagged:  { label: 'Flagged',  bg: '#fce7f3', color: '#9d174d', icon: 'flag' },
  out_of_stock: { label: 'Out of Stock', bg: '#f3f4f6', color: '#374151', icon: 'inventory' },
};

function Badge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{s.icon}</span>{s.label}
    </span>
  );
}

export default function AdminProducts() {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ msg: '', type: 'success' });
  const [actionLoading, setActionLoading] = useState('');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set('status', filterStatus);
      if (search) params.set('search', search);
      const res = await fetch(`${API}/products/admin/all?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setProducts(data.products || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [token, filterStatus, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const doAction = async (productId, action) => {
    setActionLoading(productId + action);
    try {
      const res = await fetch(`${API}/products/admin/${productId}/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) { showToast(data.message); fetchProducts(); }
      else showToast(data.message, 'error');
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  const toggleStatus = async (product) => {
    const newStatus = product.status === 'active' ? 'paused' : 'active';
    setActionLoading(product._id + 'toggle');
    try {
      const res = await fetch(`${API}/products/${product._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) { showToast(`Product ${newStatus}`); fetchProducts(); }
      else showToast(data.message, 'error');
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  const tabs = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Flagged', value: 'flagged' },
    { label: 'Rejected', value: 'paused' },
  ];

  const counts = {
    '': products.length,
    active: products.filter(p => p.status === 'active').length,
    pending: products.filter(p => p.status === 'pending').length,
    flagged: products.filter(p => p.status === 'flagged').length,
    paused: products.filter(p => p.status === 'paused').length,
  };

  const pendingCount = products.filter(p => p.status === 'pending').length;
  const flaggedCount = products.filter(p => p.status === 'flagged').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#0a1628', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin/dashboard" style={{ color: '#9ca3af', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.88rem', fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span> Dashboard
          </Link>
          <span style={{ color: '#374151' }}>|</span>
          <h1 style={{ color: '#fff', margin: 0, fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: '#a3e635', fontSize: '20px' }}>storefront</span>
            Product Approvals
          </h1>
        </div>
        {(pendingCount + flaggedCount) > 0 && (
          <span style={{ background: '#f59e0b', color: '#111', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700 }}>
            {pendingCount + flaggedCount} Need Review
          </span>
        )}
        <span style={{ background: '#dc2626', color: '#fff', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>ADMIN</span>
      </header>

      {/* Toast */}
      {toast.msg && (
        <div style={{ position: 'fixed', top: '72px', right: '24px', background: toast.type === 'error' ? '#dc2626' : '#1e5631', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{toast.type === 'error' ? 'error' : 'check_circle'}</span>
          {toast.msg}
        </div>
      )}

      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Products', value: products.length, color: '#3182ce', icon: 'inventory_2' },
            { label: 'Active & Live', value: products.filter(p => p.status === 'active').length, color: '#10b981', icon: 'check_circle' },
            { label: 'Pending Review', value: pendingCount, color: '#f59e0b', icon: 'pending' },
            { label: 'Flagged', value: flaggedCount, color: '#ec4899', icon: 'flag' },
            { label: 'Rejected', value: products.filter(p => p.status === 'paused').length, color: '#ef4444', icon: 'cancel' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '26px' }}>{s.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>{loading ? '…' : s.value}</p>
                <p style={{ margin: '3px 0 0', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Tabs */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem 1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '8px 14px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#9ca3af' }}>search</span>
            <input placeholder="Search products, farmers, districts…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.88rem', color: '#111827', width: '100%' }} />
            {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span></button>}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t.value} onClick={() => setFilterStatus(t.value)}
                style={{ padding: '6px 14px', borderRadius: '999px', border: filterStatus === t.value ? '2px solid #0a1628' : '2px solid #e5e7eb', background: filterStatus === t.value ? '#0a1628' : '#fff', color: filterStatus === t.value ? '#fff' : '#374151', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>
                {t.label} {counts[t.value] > 0 ? `(${counts[t.value]})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>progress_activity</span><p>Loading…</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '20px', color: '#9ca3af' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '1rem' }}>inventory_2</span>
            <p style={{ fontWeight: 600 }}>No products found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {products.map(product => (
              <div key={product._id} style={{ background: '#fff', borderRadius: '20px', boxShadow: product.status === 'pending' ? '0 0 0 2px #f59e0b, 0 4px 16px rgba(0,0,0,0.06)' : product.status === 'flagged' ? '0 0 0 2px #ec4899, 0 4px 16px rgba(0,0,0,0.06)' : '0 1px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                {/* Product Image */}
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={product.images?.[0] || 'https://via.placeholder.com/320x180?text=No+Image'} alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}><Badge status={product.status} /></div>
                  {product.is_organic && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', color: '#166534', padding: '2px 8px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>eco</span> Organic
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>{product.name}</h3>
                      <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#1e5631' }}>agriculture</span>
                        {product.farmer_name} · {product.farm_district}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: '#111827' }}>₹{product.price_per_unit}</p>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>/{product.unit}</p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.68rem', background: '#f0fdf4', color: '#1e5631', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{product.category}</span>
                    <span style={{ fontSize: '0.68rem', background: '#f1f5f9', color: '#374151', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>Stock: {product.stock_quantity} {product.unit}</span>
                    <span style={{ fontSize: '0.68rem', background: '#f1f5f9', color: product.freshness_score >= 80 ? '#065f46' : product.freshness_score >= 60 ? '#92400e' : '#991b1b', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                      Freshness: {product.freshness_score}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {/* Approve — for pending/flagged/paused */}
                    {product.status !== 'active' && (
                      <button onClick={() => doAction(product._id, 'approve')} disabled={!!actionLoading}
                        style={{ flex: 1, padding: '8px', background: '#1e5631', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', opacity: actionLoading ? 0.6 : 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>check_circle</span>
                        {actionLoading === product._id + 'approve' ? '…' : 'Approve'}
                      </button>
                    )}

                    {/* Pause/Resume for active */}
                    {product.status === 'active' && (
                      <button onClick={() => toggleStatus(product)} disabled={!!actionLoading}
                        style={{ flex: 1, padding: '8px', background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', opacity: actionLoading ? 0.6 : 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>pause</span>
                        {actionLoading === product._id + 'toggle' ? '…' : 'Pause'}
                      </button>
                    )}

                    {/* Flag */}
                    {product.status !== 'flagged' && (
                      <button onClick={() => doAction(product._id, 'flag')} disabled={!!actionLoading}
                        title="Flag for review"
                        style={{ width: '36px', height: '36px', padding: 0, background: '#fce7f3', color: '#9d174d', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: actionLoading ? 0.6 : 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>flag</span>
                      </button>
                    )}

                    {/* Reject */}
                    {product.status !== 'paused' && (
                      <button onClick={() => doAction(product._id, 'reject')} disabled={!!actionLoading}
                        title="Reject listing"
                        style={{ width: '36px', height: '36px', padding: 0, background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: actionLoading ? 0.6 : 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
