const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getFarmerOrders,
  updateFarmerOrderStatus,
  adminApproveOrder,
  adminUpdateOrderStatus,
  cancelOrder,
  getAllOrders,
  getFarmerPendingCount,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Customer routes
router.post('/', protect, authorize('customer', 'admin'), placeOrder);
router.get('/', protect, authorize('customer', 'admin'), getMyOrders);
router.post('/:id/cancel', protect, authorize('customer', 'admin'), cancelOrder);

// Farmer routes
router.get('/farmer/pending-count', protect, authorize('farmer', 'admin', 'field_agent'), getFarmerPendingCount);
router.get('/farmer', protect, authorize('farmer', 'admin', 'field_agent'), getFarmerOrders);
router.patch('/:id/farmer-status', protect, authorize('farmer', 'admin'), updateFarmerOrderStatus);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllOrders);
router.patch('/:id/admin-approve', protect, authorize('admin'), adminApproveOrder);
router.patch('/:id/status', protect, authorize('admin'), adminUpdateOrderStatus);

// Shared (customer / farmer / admin)
router.get('/:id', protect, getOrderById);

module.exports = router;
