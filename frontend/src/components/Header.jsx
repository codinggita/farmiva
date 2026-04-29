import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva Logo" className="h-14 md:h-20 w-auto drop-shadow-md" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          
          <div className="relative cursor-pointer text-on-surface-variant hover:text-primary transition-colors flex items-center" onClick={openCart}>
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartItemCount}</span>
            )}
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-surface-variant p-1.5 rounded-lg transition-colors border border-transparent hover:border-surface-variant">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  A
                </div>
                <span className="font-medium text-on-surface">Anshu</span>
              </div>
              <button onClick={handleLogout} className="text-on-surface-variant hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 flex items-center justify-center" title="Logout">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition-colors">Log In</Link>
              <Link to="/signup" className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">Sign Up</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-on-surface-variant"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-surface-variant px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-primary">Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-primary">Products</Link>
          <div className="pt-4 border-t border-surface-variant flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm">
                      A
                    </div>
                    <span className="font-medium text-lg text-on-surface">Anshu</span>
                  </div>
                  <button onClick={handleLogout} className="text-on-surface-variant hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50" title="Logout">
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-center py-3 rounded-xl font-medium border border-surface-variant">Log In</Link>
                <Link to="/signup" className="text-center py-3 rounded-xl font-medium bg-primary text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
