import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { mockProducts } from '../utils/mockData';
import Header from '../components/Header';

function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === parseInt(id));
  const addItemToCart = useCartStore(state => state.addItem);
  const openCart = useCartStore(state => state.openCart);
  
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-4">Product Not Found</h2>
          <Link to="/products" className="text-primary hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
  };

  const getFreshnessColor = (score) => {
    if (score >= 80) return "bg-primary";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-background min-h-screen font-sans text-on-background selection:bg-primary/20 pb-20">
      <Header />

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="py-4 flex items-center gap-2 text-outline text-xs font-medium mb-4">
          <Link className="hover:text-primary transition-colors" to="/products">Products</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary-container font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] md:h-[600px] bg-white relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.tags.map((tag, index) => {
                let bgColor = "bg-secondary-container";
                let textColor = "text-on-secondary-container";
                if (tag.includes("Fresh")) {
                  bgColor = "bg-primary"; textColor = "text-white";
                } else if (tag.includes("Ripening")) {
                  bgColor = "bg-[#ba1a1a]"; textColor = "text-white";
                }
                return (
                  <span key={index} className={`px-4 py-1.5 ${bgColor} ${textColor} text-xs font-bold rounded-full uppercase tracking-wider shadow-sm`}>
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Product Info Panel */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Verified Farm Direct
              </div>
              <h1 className="text-4xl font-extrabold text-on-surface mb-2">{product.name}</h1>
              <p className="text-outline text-lg font-medium flex items-center gap-2">
                <span className="material-symbols-outlined">location_on</span>
                {product.farm} • {product.distance}
              </p>
            </div>

            {/* Freshness Score Widget */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-1">Farmiva Freshness Score</h3>
                <p className="text-xs text-outline mb-2">Calculated based on harvest time, storage, and farmer rating.</p>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div className={`h-full ${getFreshnessColor(product.freshness)}`} style={{ width: `${product.freshness}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-on-surface">{product.freshness}/100</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-surface-variant flex items-center justify-center relative">
                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-surface-variant"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className={product.freshness >= 80 ? "text-primary" : product.freshness >= 50 ? "text-yellow-500" : "text-red-500"}
                    strokeDasharray={`${product.freshness}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
                <span className="font-bold text-lg">{product.freshness}</span>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-black text-primary">{product.price}</span>
              <span className="text-lg font-medium text-outline ml-2">/ {product.unit}</span>
            </div>

            <p className="text-on-surface-variant text-base leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-lg p-4">
                <span className="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Harvested</span>
                <span className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  {product.harvestDate}
                </span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-4">
                <span className="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Storage</span>
                <span className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">kitchen</span>
                  {product.storageTip}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border-2 border-outline-variant rounded-xl overflow-hidden h-14 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined font-bold">remove</span>
                </button>
                <div className="w-12 h-full flex items-center justify-center font-bold text-lg border-x border-outline-variant">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined font-bold">add</span>
                </button>
              </div>
              <button 
                onClick={() => {
                  handleAddToCart();
                  openCart();
                }}
                className="flex-1 h-14 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;
