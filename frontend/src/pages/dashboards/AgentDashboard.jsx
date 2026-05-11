import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

const agentActions = [
  { label: 'Onboard New Farmer',   icon: 'person_add',  to: '/agent/onboard',  desc: 'Register a farmer on their behalf', primary: true },
  { label: 'List Farmer Produce',  icon: 'add_box',     to: '/agent/produce',  desc: 'Add products for an existing farmer' },
  { label: 'My Assigned Farmers',  icon: 'group',       to: '/agent/farmers',  desc: 'View all farmers in your region' },
  { label: 'Field Reports',        icon: 'assignment',  to: '/agent/reports',  desc: 'Submit and view field visit logs' },
];

function AgentDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Field Agent';
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState([
    { label: 'Farmers Onboarded', value: '…', icon: 'agriculture',  color: '#1e5631' },
    { label: 'Pending Onboarding',value: '0', icon: 'person_add',   color: '#e6a817' },
    { label: 'Products Listed',   value: '…', icon: 'inventory_2',  color: '#3182ce' },
    { label: 'Orders in Region',  value: '…', icon: 'shopping_bag', color: '#805ad5' },
  ]);

  useEffect(() => {
    fetchStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/orders/farmer`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const products = productsRes.ok ? await productsRes.json() : [];
      const orders   = ordersRes.ok   ? await ordersRes.json()   : [];

      setStats(prev => prev.map(s => {
        if (s.label === 'Products Listed') return { ...s, value: Array.isArray(products) ? products.length : '—' };
        if (s.label === 'Orders in Region') return { ...s, value: Array.isArray(orders) ? orders.length : '—' };
        return s;
      }));
    } catch { /* ignore */ }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f3ff', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva" style={{ height: '40px' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ backgroundColor: '#ede9fe', color: '#6d28d9', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>support_agent</span> Field Agent
          </span>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#6d28d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            {userName.charAt(0)}
          </div>
          <span style={{ fontWeight: 600, color: '#111827' }}>{userName}</span>
          <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Welcome Banner */}
        <div style={{ background: 'linear-gradient(135deg, #5b21b6, #7c3aed)', borderRadius: '20px', padding: '2rem 2.5rem', color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Field Agent Dashboard <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>support_agent</span>
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>{userName}</h1>
            <p style={{ fontSize: '0.85rem', opacity: 0.85, margin: 0 }}>Onboard farmers, list produce & submit field reports.</p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: '110px', opacity: 0.1, position: 'absolute', right: '2rem' }}>support_agent</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '24px' }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Agent Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1rem' }}>
          {agentActions.map((action) => (
            <Link key={action.label} to={action.to} state={{ title: action.label, role: 'agent' }}
              style={{ backgroundColor: action.primary ? '#6d28d9' : '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: action.primary ? 'rgba(255,255,255,0.2)' : '#6d28d918', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: action.primary ? '#fff' : '#6d28d9', fontSize: '22px' }}>{action.icon}</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, color: action.primary ? '#fff' : '#111827', margin: '0 0 0.2rem', fontSize: '0.95rem' }}>{action.label}</p>
                <p style={{ fontSize: '0.78rem', color: action.primary ? 'rgba(255,255,255,0.75)' : '#6b7280', margin: 0 }}>{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AgentDashboard;
