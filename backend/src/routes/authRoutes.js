const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin: list all users
router.get('/admin/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: get a single user
router.get('/admin/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: update user role / approval
router.patch('/admin/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { accountType, isApproved } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (accountType) user.accountType = accountType;
    if (typeof isApproved === 'boolean') user.isApproved = isApproved;
    await user.save();
    res.json({ message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: delete user
router.delete('/admin/users/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user profile
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
