import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-on-background bg-surface-container-lowest antialiased min-h-screen flex flex-col font-body-md">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between px-6 lg:px-12 h-20 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-3xl">eco</span>
            <span className="text-2xl font-black tracking-tight text-primary">Farmiva</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link className="text-sm font-medium text-primary border-b-2 border-primary pb-1" to="/">Home</Link>
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" href="#">How it works</a>
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" href="#">For Farmers</a>
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200" href="#">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-200 hidden md:block">Login</button>
            <Link to="/signup" className="text-sm font-medium bg-primary-container text-on-primary px-6 py-2 rounded-xl hover:bg-primary transition-colors duration-200 shadow-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex flex-col gap-8 z-10">
              <span className="font-label-md text-label-md text-primary-container tracking-wider uppercase bg-surface-container inline-block px-4 py-2 rounded-full w-fit">Fresh from the source</span>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] xl:text-[48px] leading-tight font-extrabold text-on-surface tracking-tight whitespace-nowrap">
                Farm-fresh, <span className="text-primary">at your door</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[512px]">
                Experience the taste of real, locally sourced produce. We bridge the gap between rural farmers and your kitchen table, ensuring peak freshness and fair prices.
              </p>
              <div className="bg-surface-container-lowest p-2 rounded-xl border border-surface-variant flex items-center max-w-[448px] shadow-[0_10px_40px_-10px_rgba(0,200,83,0.08)]">
                <span className="material-symbols-outlined text-outline ml-3">location_on</span>
                <input className="font-body-md text-body-md border-none focus:ring-0 bg-transparent flex-grow text-on-surface placeholder:text-outline outline-none" placeholder="Enter your zip code" type="text"/>
                <button className="bg-primary-container text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors duration-200">Find Produce</button>
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-2xl overflow-hidden border border-surface-container shadow-[0_10px_40px_-10px_rgba(0,200,83,0.08)]">
              <img alt="Fresh organic vegetables including tomatoes, leafy greens, and root vegetables beautifully arranged in a rustic wooden crate with soft natural sunlight" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLgmzi8wySeU7c7rEeMeymQOvt1dyHgdj7Tg5ZSwFDyaLVB7Mn8Kjs6idaA9y1LATeW8AZof8Hgnnaja1ssK4K9jH5Aw1Z8EwqdOotC43crXT-MnUZfuVLCKVkcP66QVa4ofZVKWpb4IZaTSGCtQ82IFKpqhT3eGL6XKlTS0STFOK7vJL2B2ohk_c8SjzLhBras5a__7X_uBMUI0XneadulQfHd2VrUeGTpQbpYfvymM9Jk7Qzesc6PHRrbvvCc2i7xk-4c9xLFEXK"/>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-container rounded-full mix-blend-multiply opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary-container rounded-full mix-blend-multiply opacity-20 blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="bg-surface border-y border-surface-variant py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-3xl">psychiatry</span>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface">AI Freshness</h4>
                <p className="font-caption text-caption text-on-surface-variant">Predicted peak ripeness</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-3xl">shield_with_heart</span>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface">Damage-proof</h4>
                <p className="font-caption text-caption text-on-surface-variant">Secure transit packaging</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-3xl">agriculture</span>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface">Rural Hub</h4>
                <p className="font-caption text-caption text-on-surface-variant">Empowering local hubs</p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-3xl">handshake</span>
                </div>
                <h4 className="font-label-md text-label-md text-on-surface">Direct from Farmers</h4>
                <p className="font-caption text-caption text-on-surface-variant">No middleman markup</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-h2 text-h2 text-on-surface mb-2">Harvested Today</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">The freshest picks from our local network.</p>
            </div>
            <button className="font-label-md text-label-md text-primary-container hover:text-primary flex items-center gap-1 transition-colors">
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,200,83,0.08)] group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img alt="Close up of fresh organic potatoes covered in light dirt resting on a wooden table with soft natural lighting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw8m2ti7i9QKyyUg3dJ9IbPykHOMmR1wr5HFQVxA3_Cjv4IjPrLUMXSa3l7K_tRmK1XU42kKtemCS0FT0-AmaMvrpFSQquxZ9lW_DK3wG4NYpLZEULpcNvavJaJv_jbNTS-KEIum6UAlbkn3wyA6IdC4agSvKOEqtHETr-b5VHfvhPfMgdeLSuz0jC1_f7pylvDvjN4Pgte9KYgtJoFUT9wsWS5GMPOZB_A7iqLfyqQx_VJkFKhq15h5rmUy9T065Wjz9F6zFr72JX"/>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-sm">star</span>
                  <span className="font-caption text-caption text-on-surface font-bold">98% Fresh</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-1">Russet Potatoes</h3>
                <p className="font-caption text-caption text-on-surface-variant mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span> Nashik Orchards, 12km
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-h3 text-h3 text-on-surface">₹45<span className="font-caption text-caption text-on-surface-variant font-normal">/kg</span></span>
                  <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors duration-200">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Product 2 */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,200,83,0.08)] group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img alt="Vibrant bunch of fresh carrots with green leafy tops laid out on a dark rustic background with dramatic lighting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9O9Ikd6KekvcafyESv38Y7pYJvxZbjybmHu0teESyeJzusmP37JiHijByv0fzIDLuWSoFbLi8Eyp2EhawjJyb6fyDbyUnpBfIoHUj5pV_I4I7gpzljgj5UvloEPIV0cnmfIp_L7XM_OQsTvEyIsmqxtGFJ0rzqI7S3ADwe66UOk_KcH4LI-WV7Kfk1Jss-b6Em9ubYdqss6MHiM3DNYJRthDIbVwCx0hKfPsQRMWsSj3EzC3-olQzYG1ATPB04WOh2Ri5mElDJs6m"/>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-sm">star</span>
                  <span className="font-caption text-caption text-on-surface font-bold">95% Fresh</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-1">Heirloom Carrots</h3>
                <p className="font-caption text-caption text-on-surface-variant mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span> Munnar Hill Farms, 8km
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-h3 text-h3 text-on-surface">₹30<span className="font-caption text-caption text-on-surface-variant font-normal">/bunch</span></span>
                  <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors duration-200">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Product 3 */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,200,83,0.08)] group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img alt="Bright red ripe tomatoes on the vine covered in fresh morning dew drops against a softly blurred green background" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKyOYku35SGippTW1XGHjFS5Y5_VbbA-hAgNAGcJbJlWCSWX0OCgo-csuu_MOP_dhPXL1Zu-AI7J5HTVm4F0ghvDEsFGmUJOToYPc6UmvYKzB8t3zeddP98_pXcfCpv8l0D1Q6rIX-ECq5bDfiPvnxgBD_mJ42AqCTc_mZg4XTK0rMcn7xKr4Y5uCxH_sqaOktN3UsZJiNxTwF5rggYN0kqogC_3Y2sp6-ljfmqK68_5NjlIIuyal_9X2XgoKJCSyvjeUC3HHxpH71"/>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-sm">star</span>
                  <span className="font-caption text-caption text-on-surface font-bold">99% Fresh</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-1">Vine Tomatoes</h3>
                <p className="font-caption text-caption text-on-surface-variant mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span> Punjab Wheat Belt, 5km
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-h3 text-h3 text-on-surface">₹60<span className="font-caption text-caption text-on-surface-variant font-normal">/kg</span></span>
                  <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors duration-200">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Product 4 */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-variant overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,200,83,0.08)] group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img alt="Lush green bunch of crisp kale leaves freshly harvested sitting on a light wooden surface in bright natural daylight" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxKcRq6OM4W77DxnEboiVyvLOk2ziP3t2CmvdX_OlAj_tTOXAkCCchU3PByZEKt-4VUgBjPA0S9SFaRZmHVRaXtTAGocZHAP-Xn-6Pcxu6-r6W2FjbxIMjbQTHw0jOogU1rvtjmUXSaWPEJ9QDIIb-eMQ3a2kiu0Hbo1dKJO6eRrw5vl9Tvh0OpmqtuSETWLeI2-51LyPIXkS7X0XfkDM7FBDRUTe1on9OT_AdiIy7DtSotNCoOKlIuilulZSDPFtg1a_K5Wt1wdSB"/>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-sm">star</span>
                  <span className="font-caption text-caption text-on-surface font-bold">92% Fresh</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-1">Organic Lacinato Kale</h3>
                <p className="font-caption text-caption text-on-surface-variant mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span> Ooty Organic Hub, 15km
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-h3 text-h3 text-on-surface">₹40<span className="font-caption text-caption text-on-surface-variant font-normal">/bunch</span></span>
                  <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors duration-200">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-surface py-24 border-y border-surface-variant">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-h2 text-h2 text-on-surface mb-4">Farm to Fork, Simplified</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-16 max-w-[672px] mx-auto">Three simple steps to bring the farmer's market experience directly to your doorstep.</p>
            <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-outline-variant z-0 w-2/3 mx-auto"></div>
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center z-10 relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-lowest border-4 border-surface shadow-sm flex items-center justify-center mb-6 text-primary-container">
                  <span className="material-symbols-outlined text-4xl">search</span>
                </div>
                <h3 className="font-h3 text-xl mb-2 text-on-surface">Browse Local</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] text-center">Discover seasonal produce from vetted farms within an 80-km radius.</p>
              </div>
              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center z-10 relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-lowest border-4 border-surface shadow-sm flex items-center justify-center mb-6 text-secondary">
                  <span className="material-symbols-outlined text-4xl">shopping_basket</span>
                </div>
                <h3 className="font-h3 text-xl mb-2 text-on-surface">Order Fresh</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] text-center">Select exactly what you need. Farmers harvest only what is ordered to eliminate waste.</p>
              </div>
              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center z-10 relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-lowest border-4 border-surface shadow-sm flex items-center justify-center mb-6 text-primary-container">
                  <span className="material-symbols-outlined text-4xl">local_shipping</span>
                </div>
                <h3 className="font-h3 text-xl mb-2 text-on-surface">Delivered Direct</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] text-center">Receive your items within 48 hours of harvest in secure, climate-friendly packaging.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 flex flex-col md:flex-row justify-between items-start gap-8 divide-y divide-slate-100 md:divide-none">
          <div className="w-full md:w-auto">
            <span className="text-xl font-bold text-primary mb-4 block flex items-center gap-1">
              <span className="material-symbols-outlined">eco</span> Farmiva
            </span>
            <p className="text-sm leading-relaxed text-slate-500 max-w-[320px]">
              © 2024 Farmiva. Precision agriculture for a sustainable future.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 w-full md:w-auto pt-8 md:pt-0">
            <div className="flex flex-col gap-3 min-w-[120px]">
              <a className="text-sm leading-relaxed text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-sm leading-relaxed text-slate-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-3 min-w-[120px]">
              <a className="text-sm leading-relaxed text-slate-500 hover:text-primary transition-colors" href="#">Contact</a>
              <a className="text-sm leading-relaxed text-slate-500 hover:text-primary transition-colors" href="#">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
