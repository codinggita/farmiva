import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

const STATUS_COLORS = {
  placed:     { bg: '#fef3c7', color: '#92400e', label: 'Awaiting Approval' },
  confirmed:  { bg: '#dbeafe', color: '#1e40af', label: 'Confirmed (Farmer Notified)' },
  packed:     { bg: '#ede9fe', color: '#5b21b6', label: 'Packed' },
  dispatched: { bg: '#e0f2fe', color: '#075985', label: 'Dispatched' },
  delivered:  { bg: '#d1fae5', color: '#065f46', label: 'Delivered' },
  cancelled:  { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled' },
};

function Badge({ status }) {
  const s = STATUS_COLORS[status] || { bg: '#f3f4f6', color: '#374151', label: status };
  return (
    <span style={{ background: s.bg, color: s.color, padding: '3px 12px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // unfiltered — for stats
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [toast, setToast] = useState({ msg: '', type: 'success' });
  const [actionLoading, setActionLoading] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      // Filtered fetch (for the list)
      const params = new URLSearchParams({ limit: 50 });
      if (filterStatus) params.set('status', filterStatus);
      const res = await fetch(`${API_BASE}/orders/admin/all?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) { setOrders(data.orders || []); setTotal(data.total || 0); }

      // Always fetch unfiltered for stats
      const allRes = await fetch(`${API_BASE}/orders/admin/all?limit=200`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allData = await allRes.json();
      if (allRes.ok) setAllOrders(allData.orders || []);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [token, filterStatus]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const approveOrder = async (orderId, action, notes = '') => {
    setActionLoading(orderId + action);
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/admin-approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action, notes }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message);
        fetchOrders();
      } else {
        showToast(data.message, 'error');
      }
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  const updateStatus = async (orderId, status) => {
    setActionLoading(orderId + status);
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) { showToast(data.message); fetchOrders(); }
      else { showToast(data.message, 'error'); }
    } catch { showToast('Network error', 'error'); }
    finally { setActionLoading(''); }
  };

  const tabs = [
    { label: 'All', value: '' },
    { label: 'Pending Approval', value: 'placed' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Packed', value: 'packed' },
    { label: 'Dispatched', value: 'dispatched' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

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
            <span className="material-symbols-outlined" style={{ color: '#a3e635', fontSize: '20px' }}>receipt_long</span>
            Order Management
          </h1>
        </div>
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
            { label: 'Total Orders',    value: allOrders.length,                                         color: '#3182ce', icon: 'receipt_long' },
            { label: 'Pending Approval',value: allOrders.filter(o => o.status === 'placed').length,     color: '#e6a817', icon: 'pending_actions' },
            { label: 'Confirmed',       value: allOrders.filter(o => o.status === 'confirmed').length,   color: '#1e5631', icon: 'check_circle' },
            { label: 'Delivered',       value: allOrders.filter(o => o.status === 'delivered').length,   color: '#10b981', icon: 'local_shipping' },
            { label: 'Cancelled',       value: allOrders.filter(o => o.status === 'cancelled').length,   color: '#ef4444', icon: 'cancel' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.2rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ color: s.color, fontSize: '28px' }}>{s.icon}</span>
              <div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: '0.72rem', color: '#6b7280', margin: 0 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {tabs.map(t => (
            <button key={t.value} onClick={() => setFilterStatus(t.value)}
              style={{ padding: '7px 16px', borderRadius: '999px', border: filterStatus === t.value ? '2px solid #0a1628' : '2px solid #e5e7eb', background: filterStatus === t.value ? '#0a1628' : '#fff', color: filterStatus === t.value ? '#fff' : '#374151', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>progress_activity</span>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '20px', color: '#6b7280' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '1rem' }}>receipt_long</span>
            <p style={{ fontWeight: 600 }}>No orders found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map(order => {
              const isPending = order.status === 'placed';
              const isExpanded = expandedId === order._id;

              return (
                <div key={order._id} style={{ background: '#fff', borderRadius: '18px', boxShadow: isPending ? '0 0 0 2px #f59e0b, 0 4px 16px rgba(0,0,0,0.06)' : '0 1px 8px rgba(0,0,0,0.06)', overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                  {/* Order Header Row */}
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', cursor: 'pointer', borderBottom: isExpanded ? '1px solid #f3f4f6' : 'none' }}
                    onClick={() => setExpandedId(isExpanded ? null : order._id)}>
                    {/* Pending indicator */}
                    {isPending && (
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px #fef3c7' }} />
                    )}
                    <div style={{ flex: 1, minWidth: '140px' }}>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: '#111827' }}>#{order.order_number}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                        {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                    <div style={{ minWidth: '120px' }}>
                      <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>{order.customer_name}</p>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af' }}>{order.customer_phone || '—'}</p>
                    </div>
                    <div style={{ minWidth: '80px' }}>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: '#1e5631' }}>₹{order.total_amount}</p>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af' }}>{order.payment_method?.toUpperCase()}</p>
                    </div>
                    <Badge status={order.status} />
                    <span className="material-symbols-outlined" style={{ color: '#9ca3af', fontSize: '20px', marginLeft: 'auto' }}>
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {/* Items */}
                      <div>
                        <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.85rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Order Items</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {order.items?.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: '#f9fafb', borderRadius: '12px' }}>
                              {item.image && <img src={item.image} alt={item.product_name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />}
                              <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>{item.product_name}</p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                                  {item.quantity} {item.unit} × ₹{item.unit_price}
                                  {item.farmer_name && <span style={{ marginLeft: '8px', color: '#1e5631' }}>· {item.farmer_name}</span>}
                                </p>
                              </div>
                              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>₹{item.subtotal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Farmer statuses */}
                      {order.farmer_statuses?.length > 0 && (
                        <div>
                          <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '0.85rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Farmer Responses</p>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {order.farmer_statuses.map((fs, i) => (
                              <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '8px 14px', fontSize: '0.8rem' }}>
                                <span style={{ fontWeight: 700, color: '#1e5631' }}>{fs.farmer_name}</span>
                                <span style={{ marginLeft: '8px', color: '#6b7280' }}>→</span>
                                <span style={{ marginLeft: '6px', fontWeight: 600, color: { pending: '#f59e0b', accepted: '#10b981', rejected: '#ef4444', packed: '#3b82f6' }[fs.status] || '#374151' }}>
                                  {fs.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Delivery info */}
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '10px 14px', flex: 1 }}>
                          <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Delivery</p>
                          <p style={{ margin: '2px 0 0', fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
                            {order.delivery_mode === 'urban_doorstep' ? '🏠 Urban Doorstep' : '🏪 Rural Hub Pickup'}
                          </p>
                          {order.delivery_address && <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#6b7280' }}>{order.delivery_address}</p>}
                          {order.hub_name && <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#6b7280' }}>Hub: {order.hub_name}</p>}
                        </div>
                        <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '10px 14px', flex: 1 }}>
                          <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Financials</p>
                          <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#6b7280' }}>Subtotal: ₹{order.subtotal}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#6b7280' }}>Delivery: ₹{order.delivery_fee} · Platform: ₹{order.platform_fee}</p>
                          <p style={{ margin: '2px 0 0', fontSize: '0.88rem', fontWeight: 800, color: '#1e5631' }}>Total: ₹{order.total_amount}</p>
                        </div>
                      </div>

                      {/* Admin Actions */}
                      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>Admin Actions:</p>

                        {/* Approve / Reject for placed orders */}
                        {order.status === 'placed' && (
                          <>
                            <button
                              onClick={() => approveOrder(order._id, 'approve')}
                              disabled={!!actionLoading}
                              style={{ background: '#1e5631', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', opacity: actionLoading ? 0.6 : 1 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                              {actionLoading === order._id + 'approve' ? 'Approving...' : 'Approve & Notify Farmers'}
                            </button>
                            <button
                              onClick={() => approveOrder(order._id, 'reject')}
                              disabled={!!actionLoading}
                              style={{ background: '#fff', color: '#dc2626', border: '2px solid #fca5a5', borderRadius: '10px', padding: '8px 16px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', opacity: actionLoading ? 0.6 : 1 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cancel</span>
                              {actionLoading === order._id + 'reject' ? 'Rejecting...' : 'Reject Order'}
                            </button>
                          </>
                        )}

                        {/* Dispatch for packed orders */}
                        {order.status === 'packed' && (
                          <button
                            onClick={() => updateStatus(order._id, 'dispatched')}
                            disabled={!!actionLoading}
                            style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', opacity: actionLoading ? 0.6 : 1 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>local_shipping</span>
                            {actionLoading === order._id + 'dispatched' ? 'Updating...' : 'Mark as Dispatched'}
                          </button>
                        )}

                        {/* Deliver for dispatched orders */}
                        {order.status === 'dispatched' && (
                          <button
                            onClick={() => updateStatus(order._id, 'delivered')}
                            disabled={!!actionLoading}
                            style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', opacity: actionLoading ? 0.6 : 1 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>done_all</span>
                            {actionLoading === order._id + 'delivered' ? 'Updating...' : 'Mark as Delivered'}
                          </button>
                        )}

                        {['placed', 'confirmed', 'packed'].includes(order.status) && (
                          <button
                            onClick={() => updateStatus(order._id, 'cancelled')}
                            disabled={!!actionLoading}
                            style={{ background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: '0.82rem', marginLeft: 'auto' }}>
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
