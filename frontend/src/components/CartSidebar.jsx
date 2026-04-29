import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function CartSidebar() {
  const navigate = useNavigate();
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getCartTotal 
  } = useCartStore();

  if (!isCartOpen) return null;

  const total = getCartTotal();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined">shopping_cart</span>
            Your Cart
          </h2>
          <button 
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-outline text-center">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">shopping_cart</span>
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Looks like you haven't added any fresh produce yet.</p>
              <button 
                onClick={closeCart}
                className="mt-6 px-6 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary/20 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-on-surface line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <p className="text-xs text-outline mb-2">{item.farm}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-primary">{item.price}</span>
                      <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden h-8">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-full flex items-center justify-center bg-surface-container-low hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-full flex items-center justify-center bg-surface-container-low hover:bg-surface-variant transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-outline-variant bg-surface-container-low">
            <div className="flex items-center justify-between mb-4">
              <span className="text-on-surface-variant font-medium">Subtotal</span>
              <span className="text-xl font-black text-on-surface">₹{total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-outline mb-4">Delivery and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
            >
              Checkout <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
