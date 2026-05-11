import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

// Dashboards
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import FarmerDashboard from './pages/dashboards/FarmerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import AdminOrders from './pages/dashboards/AdminOrders';
import AdminUsers from './pages/dashboards/AdminUsers';
import AdminProducts from './pages/dashboards/AdminProducts';
import AgentDashboard from './pages/dashboards/AgentDashboard';

// Components
import CartSidebar from './components/CartSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Router>
      <CartSidebar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Protected Role-Based Dashboards */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute requiredRole="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute requiredRole="field_agent">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Orders - real page */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* Admin Users - real page */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* Admin Products - real page */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        {/* Placeholder Routes for remaining modules */}
        {[
          '/admin/zones', '/admin/analytics', '/admin/content',
          '/agent/onboard', '/agent/produce', '/agent/farmers', '/agent/reports'
        ].map(path => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole={path.startsWith('/admin') ? 'admin' : 'field_agent'}>
                <PlaceholderPage />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
