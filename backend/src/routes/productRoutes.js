const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  toggleProductStatus,
  seedProducts,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

// Public routes
router.get('/', getProducts);
router.get('/my', protect, authorize('farmer', 'admin'), getMyProducts);

// Admin — get ALL products (any status) with optional filter
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = { deleted_at: null };
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { farmer_name: { $regex: search, $options: 'i' } },
        { farm_name: { $regex: search, $options: 'i' } },
        { farm_district: { $regex: search, $options: 'i' } },
      ];
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products, total: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin — approve / reject / flag a product
router.patch('/admin/:id/review', protect, authorize('admin'), async (req, res) => {
  try {
    const { action, notes } = req.body; // action: 'approve' | 'reject' | 'flag'
    const statusMap = { approve: 'active', reject: 'paused', flag: 'flagged' };
    if (!statusMap[action]) return res.status(400).json({ message: 'Invalid action' });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.status = statusMap[action];
    if (notes) product.admin_notes = notes;
    await product.save();

    const msgs = { approve: 'Product approved and listed', reject: 'Product rejected', flag: 'Product flagged for review' };
    res.json({ message: msgs[action], product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getProductById);

// Farmer routes
router.post('/', protect, authorize('farmer', 'admin'), createProduct);
router.put('/:id', protect, authorize('farmer', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('farmer', 'admin'), deleteProduct);
router.patch('/:id/status', protect, authorize('farmer', 'admin'), toggleProductStatus);

// Dev seed route
router.post('/seed/demo', seedProducts);

module.exports = router;
