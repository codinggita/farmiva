import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const API_BASE = 'http://localhost:5000/api';

const STATUS_CONFIG = {
  pending:  { label: 'Awaiting Response', color: '#f59e0b', bg: '#fef3c7', icon: <span className="material-symbols-outlined text-[14px]">hourglass_empty</span> },
  accepted: { label: 'Accepted',          color: '#10b981', bg: '#d1fae5', icon: <span className="material-symbols-outlined text-[14px]">check</span> },
  rejected: { label: 'Rejected',          color: '#ef4444', bg: '#fee2e2', icon: <span className="material-symbols-outlined text-[14px]">close</span> },
  packed:   { label: 'Packed & Ready',    color: '#3b82f6', bg: '#dbeafe', icon: <span className="material-symbols-outlined text-[14px]">inventory_2</span> },
};

const DELIVERY_LABELS = {
  urban_doorstep: <><span className="material-symbols-outlined text-[16px] align-middle">home</span> Urban Doorstep</>,
  rural_hub_pickup: <><span className="material-symbols-outlined text-[16px] align-middle">storefront</span> Rural Hub Pickup</>,
};

function StatCard({ icon, label, value, accent }) {
  return (
    <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '52px', height: '52px', background: accent + '20', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>{label}</p>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{value}</p>
      </div>
    </div>
  );
}

function FarmerDashboard() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'accepted' | 'all'
  const [actionLoading, setActionLoading] = useState('');
  const [toast, setToast] = useState('');

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      const [ordersRes, countRes] = await Promise.all([
        fetch(`${API_BASE}/orders/farmer`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/orders/farmer/pending-count`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const ordersData = await ordersRes.json();
      const countData = await countRes.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setPendingCount(countData.pending_count || 0);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token || userRole !== 'farmer') {
      navigate('/login');
    } else {
      fetchOrders();
      const interval = setInterval(fetchOrders, 15000);
      return () => clearInterval(interval);
    }
  }, [token, userRole, navigate, fetchOrders]);

  const handleAction = async (orderId, status) => {
    setActionLoading(orderId + status);
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/farmer-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setToast(status === 'accepted' ? <><span className="material-symbols-outlined">check</span> Order accepted! Customer will be notified.</> : status === 'rejected' ? 'Order rejected.' : <><span className="material-symbols-outlined">inventory_2</span> Order marked as packed!</>);
        setTimeout(() => setToast(''), 3500);
        fetchOrders();
      } else {
        setToast(<><span className="material-symbols-outlined">error</span> {data.message}</>);
        setTimeout(() => setToast(''), 3500);
      }
    } catch {
      setToast(<><span className="material-symbols-outlined">error</span> Network error</>);
      setTimeout(() => setToast(''), 3500);
    } finally {
      setActionLoading('');
    }
  };

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'pending') return o.my_status === 'pending';
    if (activeTab === 'accepted') return o.my_status === 'accepted';
    return true;
  });

  const totalRevenue = orders
    .filter(o => o.my_status !== 'rejected')
    .reduce((sum, o) => sum + (o.my_subtotal || 0), 0);

  const acceptedCount = orders.filter(o => o.my_status === 'accepted' || o.my_status === 'packed').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', background: '#1e5631', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', zIndex: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', animation: 'slideIn 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {toast}
        </div>
      )}

      {/* Farmer Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e5631, #2d6a4f)', color: '#fff', padding: '2rem 2rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              <span className="material-symbols-outlined text-[28px]">agriculture</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>Farmer Dashboard</h1>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Welcome back, {userName}</p>
            </div>
            {/* Live notification bell */}
            {pendingCount > 0 && (
              <div style={{ marginLeft: 'auto', background: '#fbbf24', color: '#111827', borderRadius: '999px', padding: '6px 16px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', animation: 'pulse 2s infinite' }}>
                <span className="material-symbols-outlined text-[20px]">notifications_active</span> {pendingCount} New {pendingCount === 1 ? 'Order' : 'Orders'}!
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '-1.5rem auto 0', padding: '0 1.5rem 2rem' }}>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <StatCard icon={<span className="material-symbols-outlined">pending_actions</span>} label="Pending Orders" value={pendingCount} accent="#f59e0b" />
          <StatCard icon={<span className="material-symbols-outlined">check_circle</span>} label="Accepted Orders" value={acceptedCount} accent="#10b981" />
          <StatCard icon={<span className="material-symbols-outlined">inventory_2</span>} label="Total Orders" value={orders.length} accent="#3b82f6" />
          <StatCard icon={<span className="material-symbols-outlined">payments</span>} label="Potential Revenue" value={`₹${totalRevenue}`} accent="#1e5631" />
        </div>

        {/* Orders Panel */}
        <div style={{ background: '#fff', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '2px solid #f3f4f6', padding: '0 1.5rem' }}>
            {[
              { key: 'pending', label: <><span className="material-symbols-outlined text-[16px] align-text-bottom">hourglass_empty</span> Pending ({orders.filter(o=>o.my_status==='pending').length})</> },
              { key: 'accepted', label: <><span className="material-symbols-outlined text-[16px] align-text-bottom">check_circle</span> Accepted ({orders.filter(o=>['accepted','packed'].includes(o.my_status)).length})</> },
              { key: 'all', label: <><span className="material-symbols-outlined text-[16px] align-text-bottom">list_alt</span> All Orders ({orders.length})</> },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '1rem 1.25rem', border: 'none', background: 'none', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', color: activeTab === tab.key ? '#1e5631' : '#6b7280', borderBottom: activeTab === tab.key ? '3px solid #1e5631' : '3px solid transparent', marginBottom: '-2px', transition: 'all 0.15s' }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '1.5rem' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                <div style={{ marginBottom: '0.5rem' }}><span className="material-symbols-outlined animate-spin text-[32px]">progress_activity</span></div>
                <p>Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                <div style={{ marginBottom: '1rem' }}>
                  {activeTab === 'pending' ? <span className="material-symbols-outlined text-[48px] text-green-500">celebration</span> : <span className="material-symbols-outlined text-[48px] text-gray-400">inbox</span>}
                </div>
                <h3 style={{ fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>
                  {activeTab === 'pending' ? 'No pending orders!' : 'No orders here'}
                </h3>
                <p style={{ margin: 0 }}>
                  {activeTab === 'pending' ? 'All caught up. Your products are live on the marketplace.' : 'Orders placed by customers will appear here.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredOrders.map(order => {
                  const statusConf = STATUS_CONFIG[order.my_status] || STATUS_CONFIG.pending;
                  return (
                    <div key={order._id} style={{ border: order.my_status === 'pending' ? '2px solid #fbbf24' : '1px solid #e5e7eb', borderRadius: '16px', padding: '1.25rem', background: order.my_status === 'pending' ? '#fffbeb' : '#fff', transition: 'all 0.2s' }}>
                      {/* Order header */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111827' }}>#{order.order_number}</span>
                            <span style={{ background: statusConf.bg, color: statusConf.color, padding: '2px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                              {statusConf.icon} {statusConf.label}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="material-symbols-outlined text-[14px]">person</span> {order.customer_name} {order.customer_phone && <><span className="material-symbols-outlined text-[14px] ml-1">call</span> {order.customer_phone}</>}
                          </p>
                          <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {DELIVERY_LABELS[order.delivery_mode] || order.delivery_mode}
                            {order.delivery_address && <><span className="mx-1">·</span>{order.delivery_address}</>}
                            {order.hub_name && <><span className="mx-1">·</span> Hub: {order.hub_name}</>}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontWeight: 800, fontSize: '1.15rem', color: '#1e5631' }}>₹{order.my_subtotal}</p>
                          <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af' }}>
                            {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '10px 12px', marginBottom: order.my_status === 'pending' ? '1rem' : 0 }}>
                        {order.my_items?.map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: i < order.my_items.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                            {item.image && <img src={item.image} alt={item.product_name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />}
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.88rem', color: '#111827' }}>{item.product_name}</p>
                              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                                {item.quantity} {item.unit} × ₹{item.unit_price}
                                {item.freshness_score > 0 && <span style={{ marginLeft: '6px', color: item.freshness_score >= 80 ? '#16a34a' : '#d97706' }}>● Score: {item.freshness_score}</span>}
                              </p>
                            </div>
                            <span style={{ fontWeight: 700, color: '#111827' }}>₹{item.subtotal}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons for pending */}
                      {order.my_status === 'pending' && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleAction(order._id, 'accepted')}
                            disabled={!!actionLoading}
                            style={{ flex: 1, padding: '10px', background: '#1e5631', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: actionLoading ? 0.7 : 1 }}
                          >
                            {actionLoading === order._id + 'accepted' ? <><span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>...</> : <><span className="material-symbols-outlined text-[16px]">check</span> Accept Order</>}
                          </button>
                          <button
                            onClick={() => handleAction(order._id, 'rejected')}
                            disabled={!!actionLoading}
                            style={{ padding: '10px 20px', background: '#fff', color: '#dc2626', border: '2px solid #fca5a5', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', opacity: actionLoading ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            {actionLoading === order._id + 'rejected' ? <><span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span></> : <><span className="material-symbols-outlined text-[16px]">close</span> Reject</>}
                          </button>
                        </div>
                      )}

                      {/* Pack button for accepted */}
                      {order.my_status === 'accepted' && (
                        <button
                          onClick={() => handleAction(order._id, 'packed')}
                          disabled={!!actionLoading}
                          style={{ marginTop: '0.75rem', width: '100%', padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', opacity: actionLoading ? 0.7 : 1 }}
                        >
                          {actionLoading === order._id + 'packed' ? <><span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>...</> : <><span className="material-symbols-outlined text-[16px]">inventory_2</span> Mark as Packed</>}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
      `}</style>
    </div>
  );
}

export default FarmerDashboard;
