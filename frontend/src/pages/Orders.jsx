import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const API_BASE = 'http://localhost:5000/api';

const STATUS_MAP = {
  placed:     { label: 'Order Placed',       bg: '#fef3c7', color: '#92400e', icon: 'receipt',         desc: 'Awaiting admin approval' },
  confirmed:  { label: 'Confirmed',          bg: '#dbeafe', color: '#1e40af', icon: 'check_circle',    desc: 'Admin approved · Farmers notified' },
  packed:     { label: 'Packed',             bg: '#ede9fe', color: '#5b21b6', icon: 'inventory_2',     desc: 'Farmers have packed your order' },
  dispatched: { label: 'Out for Delivery',   bg: '#e0f2fe', color: '#075985', icon: 'local_shipping',  desc: 'On the way to you' },
  delivered:  { label: 'Delivered',          bg: '#d1fae5', color: '#065f46', icon: 'done_all',        desc: 'Order completed successfully' },
  cancelled:  { label: 'Cancelled',          bg: '#fee2e2', color: '#991b1b', icon: 'cancel',          desc: 'Order was cancelled' },
};

const TIMELINE = ['placed', 'confirmed', 'packed', 'dispatched', 'delivered'];

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [cancellingId, setCancellingId] = useState('');

  useEffect(() => { fetchOrders(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); return; }
        setError(data.message || 'Failed to fetch orders');
        return;
      }
      setOrders(Array.isArray(data) ? data : (data.orders || []));
    } catch {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    const token = localStorage.getItem('token');
    setCancellingId(orderId);
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { showToast('Order cancelled successfully.'); fetchOrders(); }
      else { showToast(data.message || 'Could not cancel order.'); }
    } catch {
      showToast('Network error. Try again.');
    } finally {
      setCancellingId('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', background: '#1e5631', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span> {toast}
        </div>
      )}

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: 0 }}>My Orders</h1>
            <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '0.88rem' }}>Track and manage your orders</p>
          </div>
          <Link to="/products" style={{ textDecoration: 'none', background: '#1e5631', color: '#fff', padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>storefront</span> Shop More
          </Link>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem 1.25rem', color: '#dc2626', marginBottom: '1.5rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span> {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>progress_activity</span>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '20px', padding: '4rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '56px', color: '#d1d5db', display: 'block', marginBottom: '1rem' }}>receipt_long</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', margin: '0 0 0.5rem' }}>No orders yet</h2>
            <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>Start shopping fresh produce from local farms.</p>
            <Link to="/products" style={{ background: '#1e5631', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none' }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => {
              const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.placed;
              const canCancel = ['placed', 'confirmed'].includes(order.status);
              const currentStep = TIMELINE.indexOf(order.status);

              return (
                <div key={order._id} style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  {/* Header */}
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Order #{order.order_number}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ background: statusInfo.bg, color: statusInfo.color, padding: '4px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{statusInfo.icon}</span>
                        {statusInfo.label}
                      </span>
                      <span style={{ fontWeight: 800, color: '#1e5631', fontSize: '1rem' }}>₹{order.total_amount}</span>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  {order.status !== 'cancelled' && (
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        {TIMELINE.map((step, i) => {
                          const done = i <= currentStep;
                          const active = i === currentStep;
                          return (
                            <React.Fragment key={step}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: i < TIMELINE.length - 1 ? 0 : undefined }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: done ? '#1e5631' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? '0 0 0 4px rgba(30,86,49,0.15)' : 'none', transition: 'all 0.3s' }}>
                                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: done ? '#fff' : '#9ca3af' }}>
                                    {STATUS_MAP[step]?.icon}
                                  </span>
                                </div>
                                <span style={{ fontSize: '0.6rem', color: done ? '#1e5631' : '#9ca3af', fontWeight: done ? 700 : 400, textAlign: 'center', maxWidth: '60px', lineHeight: 1.2 }}>
                                  {STATUS_MAP[step]?.label}
                                </span>
                              </div>
                              {i < TIMELINE.length - 1 && (
                                <div style={{ flex: 1, height: '3px', background: i < currentStep ? '#1e5631' : '#f3f4f6', margin: '0 4px', marginBottom: '18px', transition: 'background 0.3s', borderRadius: '2px' }} />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#1e5631' }}>info</span>
                        {statusInfo.desc}
                      </p>
                    </div>
                  )}

                  {/* Items */}
                  <div style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {order.items?.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {item.image
                              ? <img src={item.image} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : <span className="material-symbols-outlined" style={{ color: '#1e5631', fontSize: '22px' }}>local_florist</span>
                            }
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>{item.product_name}</p>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#6b7280' }}>{item.quantity} {item.unit} × ₹{item.unit_price}</p>
                          </div>
                          <span style={{ fontWeight: 700, color: '#111827' }}>₹{item.subtotal || item.unit_price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#6b7280' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>local_shipping</span>
                        {order.delivery_mode === 'urban_doorstep' ? 'Home Delivery' : `Hub: ${order.hub_name || 'Pickup'}`}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>payments</span>
                        {order.payment_method?.toUpperCase()} · {order.payment_status}
                      </span>
                    </div>
                    {canCancel && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        disabled={cancellingId === order._id}
                        style={{ background: '#fff', color: '#dc2626', border: '1.5px solid #fca5a5', borderRadius: '10px', padding: '7px 16px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', opacity: cancellingId === order._id ? 0.6 : 1 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>
                        {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
