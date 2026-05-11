import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useLocationStore from '../store/locationStore';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userRole, setUserRole] = useState('');

  // Re-check auth whenever route changes (covers post-login navigation)
  useEffect(() => {
    const token    = localStorage.getItem('token');
    const name     = localStorage.getItem('userName');
    const role     = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    if (name) setUserName(name);
    if (role) setUserRole(role);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole('');
    navigate('/');
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'farmer':     return '/farmer/dashboard';
      case 'admin':      return '/admin/dashboard';
      case 'field_agent':return '/agent/dashboard';
      default:           return '/dashboard';
    }
  };

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const openCart      = useCartStore((state) => state.openCart);
  const locationName  = useLocationStore((state) => state.locationName);
  const pincode       = useLocationStore((state) => state.pincode);
  const isLoadingLocation = useLocationStore((state) => state.isLoading);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva Logo" className="h-14 md:h-20 w-auto drop-shadow-md" />
        </Link>
        
        {/* Location Display */}
        {(locationName || pincode) && (
          <div className="hidden lg:flex items-center gap-1.5 ml-2 px-3 py-1.5 bg-surface-variant/30 rounded-xl border border-surface-variant/50 text-sm cursor-pointer hover:bg-surface-variant/50 transition-colors">
            <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-on-surface-variant font-medium mb-0.5">Deliver to</span>
              <span className="font-semibold text-on-surface truncate max-w-[120px]">
                {isLoadingLocation ? 'Updating...' : locationName || pincode}
              </span>
            </div>
          </div>
        )}
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/"        className="hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          
          {/* Cart Icon */}
          <div className="relative cursor-pointer text-on-surface-variant hover:text-primary transition-colors flex items-center" onClick={openCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#009119" d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85"/></svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartItemCount}</span>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={getDashboardLink()}
                className="flex items-center gap-2 hover:bg-surface-variant p-1.5 rounded-lg transition-colors border border-transparent hover:border-surface-variant"
              >
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm uppercase">
                  {userName.charAt(0)}
                </div>
                <span className="font-medium text-on-surface">{userName}</span>
              </Link>
              <button onClick={handleLogout} className="text-on-surface-variant hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 flex items-center justify-center" title="Logout">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login"  className="hover:text-primary transition-colors">Log In</Link>
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
          <Link to="/"         onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-primary">Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium hover:text-primary">Products</Link>
          <div className="pt-4 border-t border-surface-variant flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm uppercase">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <span className="font-medium text-lg text-on-surface block">{userName}</span>
                    <span className="text-xs text-on-surface-variant">View Dashboard</span>
                  </div>
                </Link>
                <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="flex items-center gap-2 text-red-600 font-semibold py-2">
                  <span className="material-symbols-outlined">logout</span> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"  onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-xl font-medium border border-surface-variant">Log In</Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-center py-3 rounded-xl font-medium bg-primary text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
