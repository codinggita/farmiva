import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          
          // Add new item
          return { items: [...state.items, { ...product, quantity }] };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          // Parse price string (e.g., "₹45/kg" or "$12.50")
          const priceString = item.price.toString().replace(/[^0-9.]/g, '');
          const price = parseFloat(priceString) || 0;
          return total + (price * item.quantity);
        }, 0);
      },
      
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'farmiva-cart-storage', // name of the item in the storage (must be unique)
      version: 1, // bump version to clear stale cart data after currency change
    }
  )
);

export default useCartStore;
