const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    farmer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    farmer_name: { type: String, required: true },
    farm_name: { type: String, default: 'Local Farm' },
    farm_district: { type: String, default: 'Unknown' },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Pantry', 'Bakery', 'Herbs', 'Other'],
      required: true,
    },
    description: { type: String, default: '' },
    unit: {
      type: String,
      enum: ['kg', 'gram', 'bunch', 'piece', 'litre', '250g', '500g', 'loaf', 'jar'],
      default: 'kg',
    },
    price_per_unit: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    mrp_per_unit: { type: Number, default: 0 },
    stock_quantity: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      min: 0,
    },
    harvest_date: {
      type: Date,
      required: [true, 'Please add a harvest date'],
    },
    shelf_life_days: { type: Number, default: 5 },
    storage_type: {
      type: String,
      enum: ['cold', 'ambient', 'dry'],
      default: 'ambient',
    },
    is_organic: { type: Boolean, default: false },
    is_pesticide_free: { type: Boolean, default: false },
    freshness_score: { type: Number, min: 0, max: 100, default: 0 },
    images: [{ type: String }], // URLs
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews_count: { type: Number, default: 0 },
    distance: { type: String, default: '10km away' },
    status: {
      type: String,
      enum: ['active', 'paused', 'out_of_stock', 'flagged', 'pending'],
      default: 'active',
    },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate freshness score before saving (Mongoose v9 — async, no next)
productSchema.pre('save', async function () {
  const harvestDate = new Date(this.harvest_date);
  const now = new Date();
  const daysSinceHarvest = Math.max(0, (now - harvestDate) / (1000 * 60 * 60 * 24));

  let score = 0;

  // 1. Days since harvest (40 pts max)
  if (daysSinceHarvest < 1) score += 40;
  else if (daysSinceHarvest < 2) score += 35;
  else if (daysSinceHarvest < 3) score += 28;
  else if (daysSinceHarvest < 5) score += 20;
  else if (daysSinceHarvest < 7) score += 12;
  else score += Math.max(0, 10 - daysSinceHarvest);

  // 2. Seasonal availability (20 pts) — simplified: 15 for MVP
  score += 15;

  // 3. Storage method (20 pts)
  if (this.storage_type === 'cold') score += 20;
  else if (this.storage_type === 'dry') score += 15;
  else score += 10;

  // 4. Farmer rating (20 pts)
  const ratingScore = Math.round(((this.rating || 0) / 5) * 20);
  score += ratingScore || 15;

  this.freshness_score = Math.min(100, Math.round(score));
});


// Virtual: formatted price string
productSchema.virtual('price').get(function () {
  return `₹${this.price_per_unit}`;
});

module.exports = mongoose.model('Product', productSchema);
