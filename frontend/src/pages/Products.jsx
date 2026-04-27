import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  return (
    <div className="bg-background font-sans text-on-background selection:bg-primary/20">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF7] dark:bg-stone-900 border-b border-stone-200/50 dark:border-stone-800 shadow-[0px_4px_20px_rgba(45,106,79,0.08)]">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#2D6A4F] dark:text-emerald-500">Farmiva</Link>
            <div className="hidden md:flex items-center gap-1 text-[#2D6A4F] cursor-pointer active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-md">location_on</span>
              <span className="font-medium text-sm antialiased">New Delhi, DL</span>
              <span className="material-symbols-outlined text-xs">expand_more</span>
            </div>
          </div>
          {/* Search Center */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none" placeholder="Search fresh produce..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-6 mr-6">
              <a className="font-medium text-sm antialiased text-[#2D6A4F] dark:text-emerald-400 border-b-2 border-[#2D6A4F] pb-1" href="#">Shop All</a>
              <a className="font-medium text-sm antialiased text-stone-600 dark:text-stone-400 hover:text-[#2D6A4F] transition-colors duration-200" href="#">Fresh Harvest</a>
              <a className="font-medium text-sm antialiased text-stone-600 dark:text-stone-400 hover:text-[#2D6A4F] transition-colors duration-200" href="#">Weekly Boxes</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-outline hover:text-[#2D6A4F] active:scale-95 transition-all">location_on</button>
              <div className="relative">
                <button className="material-symbols-outlined text-outline hover:text-[#2D6A4F] active:scale-95 transition-all">shopping_cart</button>
                <span className="absolute -top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1 rounded-full">3</span>
              </div>
              <button className="material-symbols-outlined text-outline hover:text-[#2D6A4F] active:scale-95 transition-all">person</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-12 max-w-[1280px] mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="py-4 flex items-center gap-2 text-outline text-xs font-medium">
          <Link className="hover:text-primary transition-colors" to="/">Home</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary-container font-semibold">Fresh Harvest</span>
        </nav>

        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary tracking-tight">Today's Harvest</h1>
            <p className="text-on-surface-variant text-base mt-2">Organic produce picked at peak ripeness, delivered within hours.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-outline">Sort by</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-outline-variant rounded-lg px-4 py-2 pr-10 text-sm font-semibold text-on-surface focus:ring-primary focus:border-primary cursor-pointer outline-none shadow-sm">
                <option>Most Fresh</option>
                <option>Price: Low to High</option>
                <option>Distance: Nearest</option>
                <option>Popularity</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
            </div>
          </div>
        </header>

        {/* Filters Section */}
        <section className="mb-12 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-on-surface-variant">Categories</span>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md active:scale-95 transition-all">All Produce</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Fruits</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Vegetables</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Dairy &amp; Eggs</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Grains</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface text-sm font-semibold hover:border-primary hover:text-primary active:scale-95 transition-all">Herbs</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-on-surface-variant">Freshness Score</span>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  80%+ Fresh
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                  50-79% Ripening
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-on-surface-variant">Distance</span>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors">
                  Under 20km
                </button>
                <button className="px-4 py-1.5 rounded-full border border-outline-variant bg-white text-xs font-medium hover:border-primary transition-colors">
                  Next Day Delivery
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Fresh organic strawberries" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2OlDrUBvTKax7v8kvU1k_tJeJTSkIXOKkW5y4LdeyGa5o_dK4lYAMnNTo5Rn4_6pLyvU4qHUHRtz8gMzCTbZfh9eslzyhberLHeYBjzScdEDqDaOIq6b2Yn8dKtYmg7-EtqleYWzqI43SaM-OBNLzkdyqAKpDZjMH02KSSpEqFSmK3if14pFW-M29mlEsUX1s9Kw4IjsoWwMafpfXe6rvDyg2rNTRpmVos_mG165uH0D_lHPGoByDELsYwmRWMOISLZJv8uChSjqB" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-medium rounded-full uppercase tracking-wider">98% Fresh</span>
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full uppercase tracking-wider">Harvested Today</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Direct from Farm
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Heritage Strawberries</h3>
              <p className="text-outline text-xs font-medium mb-4">Nashik Orchards • 12km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$12.50<span className="text-xs font-medium text-outline"> / kg</span></span>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Fresh kale bunch" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM9cZYWfb5RjU3rhPFLpoRa9w8aUdffuLEzNVkIRynuKUVKP4M5KO6PffDsTrj5m_P7BShLW2e5iH88hMBJKT6ure8futBAJl14ey5fl0ztWFLRatBCIVdvx19D1HvhHUFxsBAdRxomibjQsFFnfq7EvSr_leEI6k4Qo5v3AC8CH0yRhK8kQ7mB2PH8Bn6z9S_gyixHMP8JLTytjyNqTqC2AAkCCJp-hzGy_OH_0JEN0o9Ti8GoEtVKfqWd72wrdgVU3z6EJ0y-Yyz" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-medium rounded-full uppercase tracking-wider">92% Fresh</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Direct from Farm
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Tuscan Curly Kale</h3>
              <p className="text-outline text-xs font-medium mb-4">Green Valley Farms • 8km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$4.20<span className="text-xs font-medium text-outline"> / bunch</span></span>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Artisan buffalo mozzarella" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW3n0_xxmcdA-nIsuUmnssw3hv_wqjdm1R3Z8R64Sv99--2BjhVw2gz0uRjF-oqIT1VfYLeS2W3LcgnUvS5MTWjOlbW7lkaak99teQ7Up499ZJOy_vzd3MPZn4TlsawfLVj5JsFrM3wm1SN3JG85LQoVCaAwqRGkYzA3p9YcGB8HuCDsFWLHfcdYL40vru5crAOtRR6jT05T2SDmlp1-QvMccdmPSd3SY9EDIjpO0pzyzoUsvtcy7q_AteL7fM6aUmkk0RRBwMYqfi" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-medium rounded-full uppercase tracking-wider">95% Fresh</span>
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full uppercase tracking-wider">New Batch</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Direct from Dairy
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Buffalo Mozzarella</h3>
              <p className="text-outline text-xs font-medium mb-4">Pure Pastures • 18km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$8.90<span className="text-xs font-medium text-outline"> / 250g</span></span>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Organic Hass avocados" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBenbWIrerncQW5Jno0sxvEwEAUlqyV7JcJTL7vZIiklwBJPbZOmfNEh8RBnKGEZAtmFjvC4Gat93SnB-EwbIrbDRcGZtBPw3B72rji7iaIVrE2BAAroLs7AAtzZRDo3FB9Iywrvq2UsWWjqDq6kNpRJvaOa4HjtrwVcSJ8VaL1-xZLvJDY93bN49LFsEipAz4KLphGWO3nNfNhxwrdbLkfZdgQc8NnWROiVZX_81vhJgl8y3mAg5qWvjwG1qSLeOwQgs0ZMImXoEU1" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-[#ba1a1a] text-white text-[10px] font-medium rounded-full uppercase tracking-wider">62% Ripening</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Direct from Farm
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Premium Hass Avocado</h3>
              <p className="text-outline text-xs font-medium mb-4">Hillside Groves • 15km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$6.40<span className="text-xs font-medium text-outline"> / unit</span></span>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Fresh heirloom tomatoes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5fMIXV40ssldSmjcDMMEjh0SBlR-ne1l6ydQNU7YtHem12evPscPIoXwRoGmHehKVNd-uwAkvs3LTIZfQ8ADyPe-2HcVVIMNGKE-UpRKHJjGl1dUUq-qNTcFvTnHznbWNbW9vlhY_ErQkHp_RU1RAfyGI5YGCuEJTRNP4Dp_0Z75FxZ3_2VH7vW2k6KX6odXsHPr1NWFy2Jp8SwMLFQyEdpGhq01EljNp__z42_4Ysk664aL1ItrdH1xS4v4PhmntpdAOsr4FuWWS" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-medium rounded-full uppercase tracking-wider">94% Fresh</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Direct from Farm
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Heirloom Tomato Mix</h3>
              <p className="text-outline text-xs font-medium mb-4">Summer Ridge • 22km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$5.80<span className="text-xs font-medium text-outline"> / 500g</span></span>
              </div>
            </div>
          </div>
          {/* Card 6 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Fresh farm honey" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMbD7UsZGBlNLt5GnbDh2tTW0GVO4bvU6PsEG5oyBhkt5PNa4pFJ4lh2d4QYPTHfv6KycFn_Y6Ci8IbG6j5uAWu_-hQMKA1VqTVQ5hmc-ufvPN2Gl0KjGiqxTCEYaxtyzdEF94m46q4d_JWr4kBD-2AqOeoI9hpNDIARmLpb53u24rrqKAmABY1HwnRsJu36O9EsLqvJH7nm-WKERfbp9w98OqBb2jKL0kqbYXr1jiez4LbN9MeTZWQNW_g5zZMA0CeBquUEIZzCGj" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full uppercase tracking-wider">Pure Raw</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Artisanal Batch
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Wildflower Forest Honey</h3>
              <p className="text-outline text-xs font-medium mb-4">Bee Well Apiary • 30km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$18.00<span className="text-xs font-medium text-outline"> / jar</span></span>
              </div>
            </div>
          </div>
          {/* Card 7 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Fresh spring onions" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjOAVU6CTbbTCWmHAk1RYvus0ziGBX62LCKyvrYUfpUV8j0mJ1TWd85tNBkPBoIE5yPr_AD6IbqctDv0zk8dnUTjP7rnTUrzBsZIUPlE5dP37PTrlcd_TF9rQJz0xdCv_0RaNNubf1-XUoZ6riLwK5Ho_JkXsssooZRRHtLgp81Gg99p6hNUW9QC3NXPgt-u5eLuLu9BJRAgGlREAzPtSgMSTHPy3JblYGhv8rg8SJFXy_Om3CyLyvwn7F-F1O3Zli2POe7MV1dzGo" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-medium rounded-full uppercase tracking-wider">99% Fresh</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Direct from Farm
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Organic Spring Onions</h3>
              <p className="text-outline text-xs font-medium mb-4">Root &amp; Sprout • 5km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$1.50<span className="text-xs font-medium text-outline"> / bunch</span></span>
              </div>
            </div>
          </div>
          {/* Card 8 */}
          <div className="group bg-white rounded-xl shadow-[0px_4px_20px_rgba(45,106,79,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(45,106,79,0.12)] hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img alt="Fresh sourdough bread" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnPtvSyYTeiRDVLspZOFOig1d3RTm9VESnR5dMv7ATUePfDRbzbIb7mZkIxVWfHmcVO1FQN5zGm20iGGuLd8TaSm2yt1V5aiN59p7uXtQBbnmDVvrdLBrnI-k_G1DzasUHBL80HttbSN5bU50R3E-k8TDOjL2GL2sKyM7xWOtyjXm-RES_60SgI1FOj3OSHMQgKFoB9TAw_fW1n8bJk33VngZ-jTP3IkOr6p0BbOM4vcqSJuPx7w5AgHwXfx7ELVEupdZ5II5mbrhy" />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-medium rounded-full uppercase tracking-wider">Baked Today</span>
              </div>
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">add_shopping_cart</span>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 text-primary text-xs font-medium mb-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Artisanal Bakery
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Heritage Sourdough</h3>
              <p className="text-outline text-xs font-medium mb-4">Grain &amp; Fire • 10km away</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">$6.00<span className="text-xs font-medium text-outline"> / loaf</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Load More */}
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all active:scale-95">
            Load More Produce
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto bg-white dark:bg-stone-950 border-t border-stone-100 dark:border-stone-900">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center px-8 py-12">
          <div className="mb-6 md:mb-0">
            <span className="font-bold text-stone-900 dark:text-white text-xl">Farmiva</span>
            <p className="text-xs uppercase tracking-widest text-stone-500 mt-2">© 2024 Farmiva Organic Modernism. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Sustainability Report</a>
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Our Farmers</a>
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Privacy Policy</a>
            <a className="text-xs uppercase tracking-widest text-stone-500 hover:underline decoration-[#2D6A4F] underline-offset-4" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-outline">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] uppercase">Explore</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-outline">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-[10px] uppercase">Cart</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-outline">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] uppercase">Account</span>
        </button>
      </div>
    </div>
  );
}

export default Products;
