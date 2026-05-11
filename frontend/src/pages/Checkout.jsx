import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import Header from '../components/Header';

const API_BASE = 'http://localhost:5000/api';

// Handle both number prices (new) and legacy string prices like "₹60" from old mock data
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  const parsed = parseFloat(String(price).replace(/[^0-9.]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
};

function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const [deliveryMode, setDeliveryMode] = useState(localStorage.getItem('savedDeliveryMode') || 'urban_doorstep');
  const [firstName, setFirstName] = useState(localStorage.getItem('savedFirstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('savedLastName') || '');
  const [phone, setPhone] = useState(localStorage.getItem('savedPhone') || '');
  const [address, setAddress] = useState(localStorage.getItem('savedAddress') || '');
  const [hubName, setHubName] = useState(localStorage.getItem('savedHubName') || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null); // holds placed order

  // Price calculations (parsePrice handles both number and legacy "₹xx" string format)
  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const deliveryFee = deliveryMode === 'urban_doorstep' ? 40 : 0;
  const platformFee = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + platformFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const payload = {
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        delivery_mode: deliveryMode,
        delivery_address: deliveryMode === 'urban_doorstep' ? `${firstName} ${lastName}, ${address}` : undefined,
        hub_name: deliveryMode === 'rural_hub_pickup' ? hubName : undefined,
        customer_phone: phone,
        payment_method: paymentMethod,
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle expired/invalid token
        if (res.status === 401 || (data.message && data.message.toLowerCase().includes('authorized'))) {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          localStorage.removeItem('userRole');
          navigate('/login', { state: { message: 'Your session has expired. Please log in again.' } });
          return;
        }

        setError(data.message || 'Failed to place order. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Save details for next time
      localStorage.setItem('savedFirstName', firstName);
      localStorage.setItem('savedLastName', lastName);
      localStorage.setItem('savedPhone', phone);
      localStorage.setItem('savedDeliveryMode', deliveryMode);
      if (deliveryMode === 'urban_doorstep') {
        localStorage.setItem('savedAddress', address);
      } else {
        localStorage.setItem('savedHubName', hubName);
      }

      // Success!
      clearCart();
      setOrderSuccess(data.order);
    } catch (err) {
      setError('Could not connect to server. Please check your connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── Order Success Screen ───────────────────────────────────────────────
  if (orderSuccess) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0fdf4', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        {/* Animated checkmark */}
        <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #1e5631, #52b788)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 16px rgba(30,86,49,0.1)', marginBottom: '1.5rem', animation: 'pop 0.5s cubic-bezier(.36,.07,.19,.97)' }}>
          <span className="material-symbols-outlined text-white text-[56px] font-bold">check</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e5631', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          Order Placed! <span className="material-symbols-outlined text-3xl">celebration</span>
        </h1>
        <p style={{ color: '#4b5563', margin: '0 0 0.25rem', fontSize: '1rem' }}>Order #{orderSuccess.order_number}</p>
        <p style={{ color: '#6b7280', margin: '0 0 2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
          <span className="material-symbols-outlined text-[18px]">agriculture</span> Farmers have been notified and will confirm within 2 hours
        </p>

        {/* Farmer notification box */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', maxWidth: '480px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: '1.5rem', border: '1px solid #bbf7d0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <span className="material-symbols-outlined text-2xl text-yellow-500">notifications_active</span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, color: '#111827' }}>Farmer Notification Sent</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Each farmer has been alerted about your order</p>
            </div>
          </div>

          {/* Unique farmers in this order */}
          {[...new Map(orderSuccess.items?.map(i => [i.farmer_name, i]) || []).values()].map((item) => (
            <div key={item.farmer_name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f0fdf4', borderRadius: '12px', marginBottom: '8px' }}>
              <div style={{ width: '36px', height: '36px', background: '#1e5631', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                {item.farmer_name?.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>{item.farmer_name}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{item.farm_name}</p>
              </div>
              <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '999px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="material-symbols-outlined text-[14px]">hourglass_empty</span> Pending
              </span>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', maxWidth: '480px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#111827', fontSize: '1rem', fontWeight: 700 }}>Order Summary</h3>
          {orderSuccess.items?.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: '0.88rem' }}>
              <span style={{ color: '#374151' }}>{item.product_name} × {item.quantity} {item.unit}</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>₹{item.subtotal}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 2px', fontSize: '0.85rem', color: '#6b7280' }}>
            <span>Platform Fee</span><span>₹{orderSuccess.platform_fee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontSize: '0.85rem', color: '#6b7280' }}>
            <span>Delivery</span><span>₹{orderSuccess.delivery_fee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', borderTop: '2px solid #f3f4f6', marginTop: '8px', fontWeight: 800, fontSize: '1.05rem', color: '#1e5631' }}>
            <span>Total Paid</span><span>₹{orderSuccess.total_amount}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/products')} style={{ background: '#1e5631', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
            Continue Shopping
          </button>
          <button onClick={() => navigate('/orders')} style={{ background: '#fff', color: '#1e5631', border: '2px solid #1e5631', borderRadius: '12px', padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
            View My Orders
          </button>
        </div>

        <style>{`
          @keyframes pop {
            0% { transform: scale(0); opacity: 0; }
            80% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ─── Empty Cart ─────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ width: '64px', height: '64px', color: '#111827' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85"/></svg>
        </div>
        <h2 style={{ fontWeight: 800, color: '#111827', margin: 0 }}>Your cart is empty</h2>
        <p style={{ color: '#6b7280', margin: 0 }}>Add some fresh produce before checking out.</p>
        <Link to="/products" style={{ background: '#1e5631', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  // ─── Checkout Form ───────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f9f6f0', fontFamily: 'Inter, sans-serif', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/products" style={{ color: '#374151', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
            ← Back
          </Link>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined text-[20px]">lock</span> Secure Checkout
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>

        {/* LEFT: Form */}
        <form id="checkout-form" onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '1rem 1.25rem', color: '#dc2626', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined text-[20px]">error</span> {error}
            </div>
          )}

          {/* Delivery Method */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined text-[22px]">local_shipping</span> Delivery Method
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { value: 'urban_doorstep', label: 'Urban Doorstep', desc: 'Delivery within 24 hours', price: '+₹40', icon: <span className="material-symbols-outlined text-[20px]">home</span> },
                { value: 'rural_hub_pickup', label: 'Rural Hub Pickup', desc: 'Pick up from nearest hub', price: 'Free', icon: <span className="material-symbols-outlined text-[20px]">storefront</span> },
              ].map(opt => (
                <label key={opt.value} style={{ cursor: 'pointer', borderRadius: '14px', border: deliveryMode === opt.value ? '2px solid #1e5631' : '2px solid #e5e7eb', background: deliveryMode === opt.value ? '#f0fdf4' : '#fff', padding: '1rem', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>{opt.icon} {opt.label}</span>
                    <input type="radio" name="delivery" value={opt.value} checked={deliveryMode === opt.value} onChange={() => setDeliveryMode(opt.value)} style={{ accentColor: '#1e5631' }} />
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#6b7280' }}>{opt.desc}</p>
                  <span style={{ fontWeight: 700, color: '#1e5631', fontSize: '0.85rem' }}>{opt.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined text-[22px]">person</span> {deliveryMode === 'urban_doorstep' ? 'Delivery Details' : 'Pickup Details'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>First Name</label>
                  <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Priya" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Last Name</label>
                  <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Mehta" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Phone Number</label>
                <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" style={inputStyle} />
              </div>

              {deliveryMode === 'urban_doorstep' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Full Address</label>
                  <input required type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Flat 4B, Green Heights, Andheri West, Mumbai - 400058" style={inputStyle} />
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Select Nearest Hub</label>
                  <select required value={hubName} onChange={e => setHubName(e.target.value)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                    <option value="">Choose a hub...</option>
                    <option value="North Village Community Center">North Village Community Center</option>
                    <option value="East Valley Farmers Market">East Valley Farmers Market</option>
                    <option value="Westside Co-op Store">Westside Co-op Store</option>
                    <option value="Central Gram Panchayat Hub">Central Gram Panchayat Hub</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Payment */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined text-[22px]">credit_card</span> Payment Method
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { value: 'cod', label: `Cash on ${deliveryMode === 'urban_doorstep' ? 'Delivery' : 'Pickup'}`, icon: <span className="material-symbols-outlined text-[22px]">payments</span> },
                { value: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: <span className="material-symbols-outlined text-[22px]">smartphone</span> },
              ].map(opt => (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', border: paymentMethod === opt.value ? '2px solid #1e5631' : '2px solid #e5e7eb', background: paymentMethod === opt.value ? '#f0fdf4' : '#fff', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value)} style={{ accentColor: '#1e5631' }} />
                  <span style={{ fontSize: '1.1rem' }}>{opt.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827' }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </form>

        {/* RIGHT: Order Summary */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined text-[22px]">inventory_2</span> Order Summary
            </h2>

            <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={item.image || 'https://via.placeholder.com/48'} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem', color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', whiteSpace: 'nowrap' }}>₹{parsePrice(item.price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280' }}>
                <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280' }}>
                <span>Delivery Fee</span><span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280' }}>
                <span>Platform Fee (5%)</span><span>₹{platformFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#111827', borderTop: '2px solid #f3f4f6', paddingTop: '10px', marginTop: '4px' }}>
                <span>Total</span><span style={{ color: '#1e5631' }}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Farmer notification notice */}
            <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '12px', marginTop: '1rem', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <span className="material-symbols-outlined text-[20px] text-yellow-600 flex-shrink-0">notifications_active</span>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#166534', lineHeight: 1.5 }}>
                <strong>Farmers will be notified instantly</strong> when you place this order and must confirm within 2 hours.
              </p>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              style={{ width: '100%', marginTop: '1.25rem', padding: '14px', background: isProcessing ? '#9ca3af' : 'linear-gradient(135deg, #1e5631, #2d6a4f)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 800, fontSize: '1rem', cursor: isProcessing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', boxShadow: isProcessing ? 'none' : '0 4px 16px rgba(30,86,49,0.3)' }}
            >
              {isProcessing ? (
                <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Placing Order...</>
              ) : (
                <><span className="material-symbols-outlined text-[20px]">check</span> Confirm Order & Notify Farmers</>
              )}
            </button>
            <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: '0.72rem', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <span className="material-symbols-outlined text-[14px]">lock</span> Secured by Farmiva. Your data is safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '12px',
  border: '2px solid #e5e7eb',
  fontSize: '0.88rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
  color: '#111827',
  transition: 'border-color 0.15s',
};

export default Checkout;
