import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

const quickLinks = [
  { label: 'Browse Products',  icon: 'storefront',       to: '/products',  desc: 'Shop fresh produce from local farms' },
  { label: 'Order History',    icon: 'receipt_long',     to: '/orders',    desc: 'View and track your past orders' },
  { label: 'Go to Checkout',   icon: 'shopping_cart',    to: '/checkout',  desc: 'Complete your pending cart order' },
  { label: 'Account Settings', icon: 'manage_accounts',  to: '#',          desc: 'Update profile & preferences' },
];

function CustomerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Customer';
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState([
    { label: 'Total Orders',   value: '…', icon: 'shopping_bag', color: '#1e5631' },
    { label: 'Pending Orders', value: '…', icon: 'pending',      color: '#e6a817' },
    { label: 'Delivered',      value: '…', icon: 'check_circle', color: '#10b981' },
    { label: 'Cancelled',      value: '…', icon: 'cancel',       color: '#e53e3e' },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 401) { navigate('/login'); return; }
        return;
      }
      const data = await res.json();
      const orders = Array.isArray(data) ? data : (data.orders || []);

      const pending   = orders.filter(o => ['placed','confirmed','packed','dispatched'].includes(o.status)).length;
      const delivered = orders.filter(o => o.status === 'delivered').length;
      const cancelled = orders.filter(o => o.status === 'cancelled').length;

      setStats([
        { label: 'Total Orders',   value: orders.length, icon: 'shopping_bag', color: '#1e5631' },
        { label: 'Pending Orders', value: pending,        icon: 'pending',      color: '#e6a817' },
        { label: 'Delivered',      value: delivered,      icon: 'check_circle', color: '#10b981' },
        { label: 'Cancelled',      value: cancelled,      icon: 'cancel',       color: '#e53e3e' },
      ]);
      setRecentOrders(orders.slice(0, 3));
    } catch { /* ignore */ }
    finally { setLoadingOrders(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const statusColor = {
    placed: '#f59e0b', confirmed: '#3b82f6', packed: '#8b5cf6',
    dispatched: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva" style={{ height: '40px' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/products" style={{ textDecoration: 'none', color: '#1e5631', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>storefront</span> Shop
          </Link>
          <Link to="/orders" style={{ textDecoration: 'none', color: '#6b7280', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>receipt_long</span> Orders
          </Link>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e5631', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
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
        <div style={{ background: 'linear-gradient(135deg, #1e5631, #2d6a4f)', borderRadius: '20px', padding: '2rem 2.5rem', color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Welcome back <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>waving_hand</span>
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>{userName}</h1>
            <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, marginTop: '0.25rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>storefront</span> Start Shopping
            </Link>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: '110px', opacity: 0.1, position: 'absolute', right: '2rem' }}>person</span>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          {/* Quick Links */}
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.to}
                  style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1rem 1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#1e563118', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: '#1e5631', fontSize: '20px' }}>{link.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#111827', margin: '0 0 0.1rem', fontSize: '0.9rem' }}>{link.label}</p>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: 0 }}>Recent Orders</h2>
              <Link to="/orders" style={{ fontSize: '0.82rem', color: '#1e5631', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              {loadingOrders ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>progress_activity</span>
                </div>
              ) : recentOrders.length === 0 ? (
                <div style={{ padding: '2.5rem', textAlign: 'center', color: '#6b7280' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '40px', display: 'block', marginBottom: '0.5rem', opacity: 0.4 }}>receipt_long</span>
                  <p style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>No orders yet</p>
                  <Link to="/products" style={{ display: 'inline-block', background: '#1e5631', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div>
                  {recentOrders.map((order, i) => (
                    <div key={order._id} style={{ padding: '1rem 1.25rem', borderBottom: i < recentOrders.length - 1 ? '1px solid #f3f4f6' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#111827' }}>#{order.order_number}</p>
                        <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#1e5631' }}>₹{order.total_amount}</p>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', backgroundColor: (statusColor[order.status] || '#6b7280') + '20', color: statusColor[order.status] || '#6b7280', textTransform: 'capitalize' }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
                    <Link to="/orders" style={{ fontSize: '0.82rem', color: '#1e5631', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span> View all orders
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
