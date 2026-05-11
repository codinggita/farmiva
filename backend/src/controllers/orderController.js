const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Place a new order (Customer)
// @route   POST /api/orders
// @access  Customer
const placeOrder = async (req, res) => {
  try {
    const {
      items, // [{ product_id, quantity }]
      delivery_mode,
      delivery_address,
      hub_name,
      customer_phone,
      payment_method = 'cod',
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Build order items by fetching product data from DB
    const orderItems = [];
    let subtotal = 0;
    const farmerMap = {}; // farmer_id → farmer info

    for (const cartItem of items) {
      const product = await Product.findById(cartItem.product_id || cartItem.id);
      if (!product) continue;
      if (product.stock_quantity < cartItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Only ${product.stock_quantity} ${product.unit} available.`,
        });
      }

      const itemSubtotal = product.price_per_unit * cartItem.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product_id: product._id,
        product_name: product.name,
        farmer_id: product.farmer_id,
        farmer_name: product.farmer_name,
        farm_name: product.farm_name,
        quantity: cartItem.quantity,
        unit: product.unit,
        unit_price: product.price_per_unit,
        freshness_score: product.freshness_score,
        subtotal: itemSubtotal,
        image: product.images?.[0] || '',
      });

      let productFarmerId = product.farmer_id;
      let fallbackFarmer = null;
      if (!productFarmerId) {
        const User = require('../models/User');
        // Find a real farmer — prefer one who owns products
        fallbackFarmer = await User.findOne({ accountType: 'farmer' });
        if (fallbackFarmer) {
          productFarmerId = fallbackFarmer._id;
          // Also patch the product so future orders are correct
          product.farmer_id = fallbackFarmer._id;
          product.farmer_name = fallbackFarmer.name;
          await product.save();
        }
      }

      // Update the already-pushed item with the resolved farmer_id
      const lastItem = orderItems[orderItems.length - 1];
      if (!lastItem.farmer_id) {
        lastItem.farmer_id = productFarmerId;
        lastItem.farmer_name = fallbackFarmer?.name || product.farmer_name;
      }

      // Track unique farmers
      if (productFarmerId) {
        const fid = productFarmerId.toString();
        if (!farmerMap[fid]) {
          farmerMap[fid] = {
            farmer_id: productFarmerId,
            farmer_name: fallbackFarmer?.name || product.farmer_name || 'Unknown Farmer',
            status: 'pending',
            is_notified: false,
          };
        }
      }
    }

    const delivery_fee = delivery_mode === 'urban_doorstep' ? 40 : 0;
    const platform_fee = Math.round(subtotal * 0.05);
    const total_amount = subtotal + delivery_fee + platform_fee;

    // Reduce stock for each product
    for (const cartItem of items) {
      await Product.findByIdAndUpdate(
        cartItem.product_id || cartItem.id,
        { $inc: { stock_quantity: -cartItem.quantity } }
      );
    }

    const order = await Order.create({
      customer_id: req.user._id,
      customer_name: req.user.name,
      customer_phone,
      items: orderItems,
      delivery_mode,
      delivery_address,
      hub_name,
      subtotal,
      delivery_fee,
      platform_fee,
      total_amount,
      payment_method,
      status: 'placed', // Awaiting admin approval
      farmer_statuses: Object.values(farmerMap),
    });

    res.status(201).json({
      message: 'Order placed successfully! Awaiting admin approval.',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer's orders
// @route   GET /api/orders
// @access  Customer
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer_id: req.user._id,
      deleted_at: null,
    }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Customer / Farmer / Admin
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const isCustomer = order.customer_id.toString() === req.user._id.toString();
    const isFarmer = order.items.some(
      (item) => item.farmer_id?.toString() === req.user._id.toString()
    );
    const isAdmin = req.user.accountType === 'admin';

    if (!isCustomer && !isFarmer && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get farmer's incoming orders (only orders admin has approved / confirmed)
// @route   GET /api/orders/farmer
// @access  Farmer
const getFarmerOrders = async (req, res) => {
  try {
    const farmerId = req.user._id;

    // Only show farmer orders that admin has approved (status !== 'placed')
    const orders = await Order.find({
      'items.farmer_id': farmerId,
      status: { $in: ['confirmed', 'packed', 'dispatched', 'delivered'] },
      deleted_at: null,
    }).sort({ createdAt: -1 });

    const filteredOrders = orders.map((order) => {
      const myItems = order.items.filter(
        (item) => item.farmer_id?.toString() === farmerId.toString()
      );
      const myStatus = order.farmer_statuses.find(
        (fs) => fs.farmer_id?.toString() === farmerId.toString()
      );
      return {
        _id: order._id,
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        delivery_mode: order.delivery_mode,
        delivery_address: order.delivery_address,
        hub_name: order.hub_name,
        my_items: myItems,
        my_status: myStatus?.status || 'pending',
        overall_status: order.status,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        my_subtotal: myItems.reduce((sum, i) => sum + i.subtotal, 0),
        createdAt: order.createdAt,
      };
    });

    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Farmer accepts or rejects their part of an order
// @route   PATCH /api/orders/:id/farmer-status
// @access  Farmer
const updateFarmerOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' | 'rejected' | 'packed'
    const farmerId = req.user._id;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const farmerStatus = order.farmer_statuses.find(
      (fs) => fs.farmer_id?.toString() === farmerId.toString()
    );

    if (!farmerStatus) {
      return res.status(403).json({ message: 'This order does not belong to you' });
    }

    farmerStatus.status = status;
    if (status === 'accepted') farmerStatus.accepted_at = new Date();
    if (status === 'packed') farmerStatus.packed_at = new Date();

    // If all farmers packed, move to packed
    const allPacked = order.farmer_statuses.every((fs) => fs.status === 'packed');
    if (allPacked) {
      order.status = 'packed';
    }

    await order.save();
    res.json({ message: `Order ${status} successfully`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin — Approve order (notifies farmers) or reject it
// @route   PATCH /api/orders/:id/admin-approve
// @access  Admin
const adminApproveOrder = async (req, res) => {
  try {
    const { action, notes } = req.body; // action: 'approve' | 'reject'

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'placed') {
      return res.status(400).json({
        message: `Cannot ${action} order — current status is "${order.status}"`,
      });
    }

    if (action === 'approve') {
      order.status = 'confirmed'; // Admin confirmed → farmers now see it
      // Mark all farmer_statuses as notified
      order.farmer_statuses.forEach((fs) => {
        fs.is_notified = true;
        fs.status = 'pending'; // Reset to pending so farmers can accept/reject
      });
      if (notes) order.notes = notes;
      await order.save();
      return res.json({
        message: 'Order approved! Farmers have been notified.',
        order,
      });
    }

    if (action === 'reject') {
      order.status = 'cancelled';
      order.farmer_statuses.forEach((fs) => (fs.status = 'rejected'));
      if (notes) order.notes = notes;

      // Restore stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product_id, {
          $inc: { stock_quantity: item.quantity },
        });
      }

      await order.save();
      return res.json({ message: 'Order rejected and stock restored.', order });
    }

    res.status(400).json({ message: 'Invalid action. Use "approve" or "reject".' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin — Update order delivery status (dispatched / delivered)
// @route   PATCH /api/orders/:id/status
// @access  Admin
const adminUpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['dispatched', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    if (status === 'cancelled') {
      order.farmer_statuses.forEach((fs) => (fs.status = 'rejected'));
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product_id, {
          $inc: { stock_quantity: item.quantity },
        });
      }
    }

    await order.save();
    res.json({ message: `Order marked as ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Customer cancels order
// @route   POST /api/orders/:id/cancel
// @access  Customer
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.customer_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (['packed', 'dispatched', 'delivered'].includes(order.status)) {
      return res.status(400).json({ message: 'Cannot cancel order after packing' });
    }

    order.status = 'cancelled';
    order.farmer_statuses.forEach((fs) => (fs.status = 'rejected'));

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock_quantity: item.quantity },
      });
    }

    await order.save();
    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin — get all orders
// @route   GET /api/orders/admin/all
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = { deleted_at: null };
    if (status) filter.status = status;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ orders, total, page: Number(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending order count for farmer
// @route   GET /api/orders/farmer/pending-count
// @access  Farmer
const getFarmerPendingCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({
      'items.farmer_id': req.user._id,
      status: { $in: ['confirmed', 'packed', 'dispatched'] },
      'farmer_statuses': {
        $elemMatch: {
          farmer_id: req.user._id,
          status: 'pending',
        },
      },
      deleted_at: null,
    });
    res.json({ pending_count: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
