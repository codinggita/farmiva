import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('customer');

  return (
    <div className="h-screen w-screen overflow-hidden flex font-sans bg-white">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[55%] h-full relative overflow-hidden flex-col p-12 xl:p-16">
        <img
          alt="Fresh organic vegetables"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777030037/ChatGPT_Image_Apr_24_2026_04_57_01_PM_e8xrr6.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f11] via-[#0a1f11]/90 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-center max-w-xl">
          {/* Top Left Header */}
          <div className="flex items-start gap-2 text-white mb-10">
            <span className="material-symbols-outlined text-[#a3e635] text-3xl">eco</span>
            <p className="text-sm font-medium leading-tight">From local farms to<br />your kitchen</p>
          </div>

          {/* Main Text */}
          <div className="mb-10">
            <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Join the<br />
              Community.<br />
              <span className="text-[#a3e635] relative inline-block">
                Start Fresh.
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#a3e635]/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </h1>
            <p className="text-white/90 text-lg leading-relaxed max-w-sm">
              Register today to access the freshest local produce delivered straight to your doorstep.
            </p>
          </div>

          {/* 3 Feature Cards */}
          <div className="flex gap-4">
            <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center text-center w-1/3 shadow-xl transition-transform hover:scale-[1.02]">
              <span className="material-symbols-outlined text-[#a3e635] mb-3 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h3 className="text-white font-bold text-sm mb-1">95% Fresh</h3>
              <p className="text-white/70 text-xs leading-tight">AI freshness<br />score</p>
            </div>
            <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center text-center w-1/3 shadow-xl transition-transform hover:scale-[1.02]">
              <span className="material-symbols-outlined text-[#a3e635] mb-3 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
              <h3 className="text-white font-bold text-sm mb-1">Smart Packed</h3>
              <p className="text-white/70 text-xs leading-tight">Damage-proof<br />packaging</p>
            </div>
            <div className="border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center text-center w-1/3 shadow-xl transition-transform hover:scale-[1.02]">
              <span className="material-symbols-outlined text-[#a3e635] mb-3 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
              <h3 className="text-white font-bold text-sm mb-1">Direct from<br />Farmers</h3>
              <p className="text-white/70 text-xs leading-tight mt-1">No middleman<br />markup</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[45%] h-full flex flex-col bg-white overflow-y-auto relative scrollbar-hide">
        <div className="p-6">
          <Link to="/" className="text-[#4b5563] hover:text-[#111827] flex items-center gap-2 font-medium transition-colors text-sm w-fit">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start pt-6 px-8 sm:px-16 lg:px-12 xl:px-20 pb-12">
          <div className="w-full max-w-[440px]">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <img 
                src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" 
                alt="Farmiva Logo" 
                className="h-24 w-auto drop-shadow-[0_0_20px_rgba(30,86,49,0.15)]" 
              />
            </div>

            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-[#111827] mb-1 tracking-tight">Create account</h1>
              <p className="text-[15px] text-[#6b7280]">Join the farm-to-table revolution</p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {/* Account Type Toggle */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setAccountType('customer')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border font-bold text-sm transition-all ${
                    accountType === 'customer' 
                    ? 'border-[#1e5631] bg-[#1e5631]/5 text-[#1e5631] ring-1 ring-[#1e5631]' 
                    : 'border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('farmer')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border font-bold text-sm transition-all ${
                    accountType === 'farmer' 
                    ? 'border-[#1e5631] bg-[#1e5631]/5 text-[#1e5631] ring-1 ring-[#1e5631]' 
                    : 'border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">agriculture</span>
                  Farmer
                </button>
              </div>

              {/* Full Name Field */}
              <div>
                <label className="block text-[13px] font-bold text-[#111827] mb-1.5" htmlFor="name">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#6b7280] text-[20px]">person</span>
                  </div>
                  <input 
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-4 py-2.5 text-[#111827] focus:border-[#1e5631] focus:ring-1 focus:ring-[#1e5631] outline-none transition-all placeholder:text-[#9ca3af] text-[15px]" 
                    id="name" 
                    placeholder="Jane Doe" 
                    required 
                    type="text"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[13px] font-bold text-[#111827] mb-1.5" htmlFor="email">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#6b7280] text-[20px]">mail</span>
                  </div>
                  <input 
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-4 py-2.5 text-[#111827] focus:border-[#1e5631] focus:ring-1 focus:ring-[#1e5631] outline-none transition-all placeholder:text-[#9ca3af] text-[15px]" 
                    id="email" 
                    placeholder="you@example.com" 
                    required 
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[13px] font-bold text-[#111827] mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#6b7280] text-[20px]">lock</span>
                  </div>
                  <input 
                    className="w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-12 py-2.5 text-[#111827] focus:border-[#1e5631] focus:ring-1 focus:ring-[#1e5631] outline-none transition-all placeholder:text-[#9ca3af] text-[15px]" 
                    id="password" 
                    placeholder="••••••••" 
                    required 
                    type={showPassword ? "text" : "password"}
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#111827] transition-colors w-8 h-8 flex items-center justify-center" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-[#1e5631] text-white text-[15px] font-bold py-3 rounded-lg hover:bg-[#1e5631]/90 transition-colors mt-2 shadow-sm" type="submit">
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e7eb]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#9ca3af] text-[11px] font-bold tracking-wider uppercase">OR SIGN UP WITH</span>
              </div>
            </div>

            {/* Social Login */}
            <button className="w-full flex items-center justify-center gap-3 border border-[#e5e7eb] bg-white text-[#111827] text-[15px] font-bold py-2.5 rounded-lg hover:bg-[#f9fafb] transition-colors shadow-sm" type="button">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
                <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.81 15.7 17.6V20.34H19.27C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"></path>
                <path d="M12 23C14.97 23 17.46 22.02 19.27 20.34L15.7 17.6C14.72 18.26 13.47 18.65 12 18.65C9.155 18.65 6.745 16.73 5.88 14.16H2.205V17.01C4.015 20.59 7.69 23 12 23Z" fill="#34A853"></path>
                <path d="M5.88 14.16C5.66 13.5 5.53 12.77 5.53 12C5.53 11.23 5.66 10.5 5.88 9.84V6.99H2.205C1.46 8.48 1.03 10.18 1.03 12C1.03 13.82 1.46 15.52 2.205 17.01L5.88 14.16Z" fill="#FBBC05"></path>
                <path d="M12 5.35C13.62 5.35 15.07 5.91 16.21 7.01L19.34 3.88C17.45 2.12 14.97 1 12 1C7.69 1 4.015 3.41 2.205 6.99L5.88 9.84C6.745 7.27 9.155 5.35 12 5.35Z" fill="#EA4335"></path>
              </svg>
              Google
            </button>

            {/* Login Link */}
            <p className="mt-6 text-center text-[#6b7280] text-[14px]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1e5631] font-bold hover:text-[#1e5631]/80 transition-colors">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
