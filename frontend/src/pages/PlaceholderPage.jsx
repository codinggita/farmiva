import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function PlaceholderPage() {
  const location = useLocation();
  const title = location.state?.title || 'Coming Soon';
  const role  = location.state?.role  || 'admin';

  const backLink = role === 'admin' ? '/admin/dashboard' : '/agent/dashboard';

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="https://res.cloudinary.com/dhnczdpqj/image/upload/v1777026735/ChatGPT_Image_Apr_24__2026__03_57_22_PM-removebg-preview_abfebp.png" alt="Farmiva" style={{ height: '40px' }} />
        </Link>
        <Link to={backLink} style={{ textDecoration: 'none', color: '#374151', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          Back to Dashboard
        </Link>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '480px', width: '100%', textAlign: 'center', border: '1px solid #f3f4f6' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(30,86,49,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#1e5631' }}>construction</span>
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 0.75rem' }}>{title}</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
            This module is currently under development. Our engineering team is working hard to bring these features to life soon.
          </p>
          <Link to={backLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#1e5631', color: '#fff', padding: '12px 24px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', width: '100%', boxSizing: 'border-box' }}>
            Return to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

export default PlaceholderPage;
