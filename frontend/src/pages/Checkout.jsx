import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const total = getCartTotal();

  const [deliveryMode, setDeliveryMode] = useState('urban'); // 'urban' or 'rural'
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = deliveryMode === 'urban' ? 40.00 : 0.00;
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      // In a real app, we'd save the order to the DB and navigate to an order success page
      // For now, let's navigate to the Orders page (which we'll build next)
      navigate('/orders', { state: { orderSuccess: true } });
    }, 2000);
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-6xl text-outline mb-4">remove_shopping_cart</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Your cart is empty</h2>
        <p className="text-outline mb-6">Add some fresh produce before checking out.</p>
        <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface selection:bg-primary/20 pb-20">
      {/* Simple Header */}
      <header className="bg-white border-b border-surface-variant sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link to="/products" className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-variant">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold">Secure Checkout</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Options */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Delivery Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col gap-2 transition-all ${deliveryMode === 'urban' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Urban Doorstep</span>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="urban" 
                      checked={deliveryMode === 'urban'}
                      onChange={() => setDeliveryMode('urban')}
                      className="text-primary focus:ring-primary h-5 w-5" 
                    />
                  </div>
                  <p className="text-sm text-outline">Delivery within 24 hours to your door.</p>
                  <span className="text-sm font-bold text-primary mt-auto">+₹40.00</span>
                </label>

                <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col gap-2 transition-all ${deliveryMode === 'rural' ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Rural Hub Pickup</span>
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="rural" 
                      checked={deliveryMode === 'rural'}
                      onChange={() => setDeliveryMode('rural')}
                      className="text-primary focus:ring-primary h-5 w-5" 
                    />
                  </div>
                  <p className="text-sm text-outline">Pick up from your nearest village hub.</p>
                  <span className="text-sm font-bold text-primary mt-auto">Free</span>
                </label>
              </div>
            </section>

            {/* Address Details */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">location_on</span>
                {deliveryMode === 'urban' ? 'Delivery Address' : 'Pickup Hub Location'}
              </h2>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1">First Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1">Last Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">
                    {deliveryMode === 'urban' ? 'Street Address' : 'Select Hub'}
                  </label>
                  {deliveryMode === 'urban' ? (
                    <input 
                      required 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                      placeholder="123 Main St, Apt 4B" 
                    />
                  ) : (
                    <select required className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white">
                      <option value="">Select a nearby hub...</option>
                      <option value="hub1">North Village Community Center</option>
                      <option value="hub2">East Valley Farmers Market</option>
                      <option value="hub3">Westside Co-op Store</option>
                    </select>
                  )}
                </div>
              </form>
            </section>

            {/* Payment Method (Mock) */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">payments</span>
                Payment Method
              </h2>
              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">credit_card</span>
                  <div>
                    <p className="font-bold">Pay on {deliveryMode === 'urban' ? 'Delivery' : 'Pickup'}</p>
                    <p className="text-xs text-outline">Cash or UPI accepted</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary">check_circle</span>
              </div>
            </section>

          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant sticky top-24">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-surface-variant" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-outline mb-1">Qty: {item.quantity}</p>
                      <span className="font-bold text-sm text-primary">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-outline-variant pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Delivery Fee</span>
                  <span className="font-semibold">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-outline-variant">
                  <span>Total</span>
                  <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Order
                    <span className="material-symbols-outlined">lock</span>
                  </>
                )}
              </button>
              <p className="text-xs text-center text-outline mt-4">
                By confirming, you agree to Farmiva's Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Checkout;
