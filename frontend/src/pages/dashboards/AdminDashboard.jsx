import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

const adminSections = [
  { label: 'User Management',    icon: 'manage_accounts',    to: '/admin/users',     desc: 'Approve/reject farmers, manage all users',        color: '#3182ce' },
  { label: 'Product Approvals',  icon: 'fact_check',         to: '/admin/products',  desc: 'Review and approve product listings',             color: '#1e5631' },
  { label: 'Order Oversight',    icon: 'receipt_long',       to: '/admin/orders',    desc: 'Monitor all platform orders & disputes',          color: '#805ad5' },
  { label: 'Delivery Zones',     icon: 'map',                to: '/admin/zones',     desc: 'Manage delivery zones and hub locations',         color: '#e6a817' },
  { label: 'Platform Analytics', icon: 'analytics',          to: '/admin/analytics', desc: 'Health metrics and business KPIs',                color: '#e53e3e' },
  { label: 'Content & Banners',  icon: 'dashboard_customize',to: '/admin/content',   desc: 'Manage promotions, categories, banners',          color: '#2d9596' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Admin';
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState([
    { label: 'Total Users',      value: '…', icon: 'group',         color: '#3182ce' },
    { label: 'Active Products',  value: '…', icon: 'inventory_2',   color: '#1e5631' },
    { label: 'Total Orders',     value: '…', icon: 'shopping_bag',  color: '#805ad5' },
    { label: 'Today\'s Revenue', value: '…', icon: 'payments',      color: '#e6a817' },
  ]);

  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE}/auth/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/orders/admin/all`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const users    = usersRes.ok    ? await usersRes.json()    : [];
      const products = productsRes.ok ? await productsRes.json() : [];
      const ordersData  = ordersRes.ok ? await ordersRes.json()  : { orders: [], total: 0 };
      const orders = ordersData.orders || [];

      const today = new Date().toDateString();
      const todayRevenue = orders
        .filter(o => new Date(o.createdAt).toDateString() === today)
        .reduce((sum, o) => sum + (o.total_amount || 0), 0);

      setStats([
        { label: 'Total Users',      value: Array.isArray(users) ? users.length : (ordersData.total || '—'), icon: 'group',        color: '#3182ce' },
        { label: 'Active Products',  value: Array.isArray(products) ? products.length : '—',                  icon: 'inventory_2',  color: '#1e5631' },
        { label: 'Total Orders',     value: ordersData.total ?? orders.length,                                 icon: 'shopping_bag', color: '#805ad5' },
        { label: "Today's Revenue",  value: `₹${todayRevenue}`,                                               icon: 'payments',     color: '#e6a817' },
      ]);
    } catch {
      // keep placeholder values
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/admin/all?limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRecentOrders(data.orders || []);
      }
    } catch { /* ignore */ }
    finally { setLoadingOrders(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const statusColors = {
    placed:     '#f59e0b',
    confirmed:  '#3b82f6',
    packed:     '#8b5cf6',
    dispatched: '#06b6d4',
    delivered:  '#10b981',
    cancelled:  '#ef4444',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{ backgroundColor: '#0a1628', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva" style={{ height: '38px' }} />
          </Link>
          <span style={{ backgroundColor: '#dc2626', color: '#fff', padding: '0.2rem 0.8rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Admin Console
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#dc2626', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
            {userName.charAt(0)}
          </div>
          <span style={{ fontWeight: 600, color: '#e5e7eb', fontSize: '0.9rem' }}>{userName}</span>
          <button onClick={handleLogout} style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
            Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Welcome Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0a1628, #1e3a5f)', borderRadius: '20px', padding: '2rem 2.5rem', color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Farmiva Admin</p>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>Welcome, {userName}</h1>
            <p style={{ fontSize: '0.88rem', opacity: 0.8, margin: 0 }}>Full platform access — manage users, products, orders & more.</p>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: '110px', opacity: 0.08, position: 'absolute', right: '2rem' }}>admin_panel_settings</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '24px' }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Admin Sections */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Admin Controls</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {adminSections.map((section) => (
                <Link key={section.label} to={section.to} state={{ title: section.label, role: 'admin' }}
                  style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.1rem 1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s, box-shadow 0.2s', borderLeft: `4px solid ${section.color}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: section.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: section.color, fontSize: '22px' }}>{section.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#111827', margin: '0 0 0.1rem', fontSize: '0.9rem' }}>{section.label}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{section.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Recent Orders</h2>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              {loadingOrders ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>progress_activity</span>
                  <p>Loading orders...</p>
                </div>
              ) : recentOrders.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '0.5rem' }}>receipt_long</span>
                  No orders yet
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                      {['Order #', 'Customer', 'Amount', 'Status', 'Date'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <tr key={order._id} style={{ borderBottom: i < recentOrders.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: '#111827' }}>#{order.order_number}</td>
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', color: '#374151' }}>{order.customer_name}</td>
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: '#1e5631' }}>₹{order.total_amount}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: (statusColors[order.status] || '#6b7280') + '20', color: statusColors[order.status] || '#6b7280', textTransform: 'capitalize' }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
