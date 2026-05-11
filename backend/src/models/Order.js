const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  product_name: { type: String, required: true },
  farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmer_name: { type: String },
  farm_name: { type: String },
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String },
  unit_price: { type: Number, required: true },
  freshness_score: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  image: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    order_number: { type: String, unique: true },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer_name: { type: String, required: true },
    customer_phone: { type: String },

    items: [orderItemSchema],

    delivery_mode: {
      type: String,
      enum: ['urban_doorstep', 'rural_hub_pickup'],
      required: true,
    },
    delivery_address: { type: String },
    hub_name: { type: String },

    subtotal: { type: Number, required: true },
    delivery_fee: { type: Number, default: 0 },
    platform_fee: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },

    payment_method: {
      type: String,
      enum: ['cod', 'upi', 'card', 'netbanking', 'wallet'],
      default: 'cod',
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },

    // Customer-facing status
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'packed', 'dispatched', 'delivered', 'cancelled'],
      default: 'placed',
    },

    // Farmer-specific status per farmer (for multi-farmer orders)
    farmer_statuses: [
      {
        farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        farmer_name: String,
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected', 'packed'],
          default: 'pending',
        },
        is_notified: { type: Boolean, default: false },
        accepted_at: Date,
        packed_at: Date,
      },
    ],

    notes: { type: String },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

// Auto-generate order number before saving
orderSchema.pre('save', async function () {
  if (!this.order_number) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.order_number = `FMV-${timestamp}-${rand}`;
  }
});

module.exports = mongoose.model('Order', orderSchema);
