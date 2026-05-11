import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protects a route by checking:
 * 1. User is authenticated (has token)
 * 2. User has the required role (if specified)
 */
function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to their correct dashboard if they have the wrong role
    const roleRedirects = {
      customer: '/products',
      farmer: '/farmer/dashboard',
      admin: '/admin/dashboard',
      field_agent: '/agent/dashboard',
    };
    return <Navigate to={roleRedirects[userRole] || '/products'} replace />;
  }

  return children;
}

export default ProtectedRoute;
