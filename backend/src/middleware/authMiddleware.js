const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect route — verifies JWT and attaches req.user
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'User not found' });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Role guard middleware factory
 * Usage: authorize('farmer', 'admin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.accountType)) {
      return res.status(403).json({
        message: `Role '${req.user?.accountType}' is not allowed to access this route`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
