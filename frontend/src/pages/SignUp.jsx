import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="h-screen overflow-hidden bg-background font-body-md text-on-surface antialiased flex">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 relative overflow-hidden">
        <img alt="Farmiva community and fresh produce" className="absolute inset-0 w-full h-full object-cover" src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777003927/ChatGPT_Image_Apr_24_2026_09_41_02_AM_wjceqf.png"/>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-sm sm:p-md lg:p-lg overflow-y-auto">
        <div className="w-full max-w-[448px] space-y-md">
          <div className="text-center lg:text-left">
            <h2 className="font-h2 text-h2 text-on-surface mb-xs">Create your account</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Start getting fresh produce delivered directly to your door.</p>
          </div>
          <form className="space-y-sm">
            <div className="grid grid-cols-2 gap-sm">
              <label className="relative flex cursor-pointer rounded-lg border border-outline-variant bg-surface-container-lowest p-sm shadow-sm focus-within:ring-2 focus-within:ring-primary-container hover:bg-surface-container-low transition-colors">
                <input defaultChecked className="peer sr-only" name="account_type" type="radio" value="customer"/>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary-container text-2xl peer-checked:text-primary" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>shopping_basket</span>
                    <span className="font-label-md text-label-md text-on-surface">I'm a Customer</span>
                  </div>
                </div>
                <span aria-hidden="true" className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-primary-container pointer-events-none"></span>
              </label>
              <label className="relative flex cursor-pointer rounded-lg border border-outline-variant bg-surface-container-lowest p-sm shadow-sm focus-within:ring-2 focus-within:ring-primary-container hover:bg-surface-container-low transition-colors">
                <input className="peer sr-only" name="account_type" type="radio" value="farmer"/>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-tertiary text-2xl peer-checked:text-primary" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"}}>agriculture</span>
                    <span className="font-label-md text-label-md text-on-surface">I'm a Farmer</span>
                  </div>
                </div>
                <span aria-hidden="true" className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-primary-container pointer-events-none"></span>
              </label>
            </div>
            <div className="space-y-sm">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-base" htmlFor="full_name">Full Name</label>
                <input className="block w-full rounded-lg border-outline-variant bg-surface-container-lowest py-2 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary shadow-sm" id="full_name" name="full_name" placeholder="Jane Doe" required type="text"/>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-base" htmlFor="email">Email Address</label>
                <input className="block w-full rounded-lg border-outline-variant bg-surface-container-lowest py-2 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary shadow-sm" id="email" name="email" placeholder="jane@example.com" required type="email"/>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-base" htmlFor="phone">Phone Number</label>
                <input className="block w-full rounded-lg border-outline-variant bg-surface-container-lowest py-2 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary shadow-sm" id="phone" name="phone" placeholder="(555) 123-4567" type="tel"/>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-base" htmlFor="password">Password</label>
                <input className="block w-full rounded-lg border-outline-variant bg-surface-container-lowest py-2 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary shadow-sm" id="password" name="password" placeholder="••••••••" required type="password"/>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-base" htmlFor="confirm_password">Confirm Password</label>
                <input className="block w-full rounded-lg border-outline-variant bg-surface-container-lowest py-2 px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary shadow-sm" id="confirm_password" name="confirm_password" placeholder="••••••••" required type="password"/>
              </div>
            </div>
            <div className="flex items-center">
              <input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary" id="terms" name="terms" required type="checkbox"/>
              <label className="ml-2 block font-body-md text-body-md text-on-surface-variant" htmlFor="terms">
                I agree to the <a className="text-primary hover:text-primary-container font-medium" href="#">Terms &amp; conditions</a>
              </label>
            </div>
            <button className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors" type="submit">
              Sign Up
            </button>
          </form>
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 font-label-sm text-label-sm text-outline">or continue with</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" type="button">
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
            </svg>
            Google
          </button>
          <p className="text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:text-primary-container">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
