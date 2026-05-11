const Product = require('../models/Product');

// @desc    Get all products (with filters, sort, pagination)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      sort = 'freshness_score',
      order = 'desc',
      is_organic,
      min_price,
      max_price,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = { deleted_at: null, status: 'active' };

    if (category) filter.category = category;
    if (is_organic === 'true') filter.is_organic = true;
    if (min_price || max_price) {
      filter.price_per_unit = {};
      if (min_price) filter.price_per_unit.$gte = Number(min_price);
      if (max_price) filter.price_per_unit.$lte = Number(max_price);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { farm_name: { $regex: search, $options: 'i' } },
        { farm_district: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, deleted_at: null });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product (Farmer only)
// @route   POST /api/products
// @access  Farmer
const createProduct = async (req, res) => {
  try {
    const {
      name, category, description, unit,
      price_per_unit, mrp_per_unit, stock_quantity,
      harvest_date, shelf_life_days, storage_type,
      is_organic, is_pesticide_free, images, tags,
      farm_name, farm_district,
    } = req.body;

    const product = await Product.create({
      farmer_id: req.user._id,
      farmer_name: req.user.name,
      farm_name: farm_name || `${req.user.name}'s Farm`,
      farm_district: farm_district || 'Local District',
      name, category, description, unit,
      price_per_unit, mrp_per_unit, stock_quantity,
      harvest_date, shelf_life_days, storage_type,
      is_organic, is_pesticide_free, images, tags,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product (Farmer only — own products)
// @route   PUT /api/products/:id
// @access  Farmer
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, deleted_at: null });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Only the farmer who owns it or admin can edit
    if (
      product.farmer_id.toString() !== req.user._id.toString() &&
      req.user.accountType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to edit this product' });
    }

    Object.assign(product, req.body);
    await product.save(); // triggers freshness score recalculation
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Soft delete product
// @route   DELETE /api/products/:id
// @access  Farmer / Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, deleted_at: null });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (
      product.farmer_id.toString() !== req.user._id.toString() &&
      req.user.accountType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    product.deleted_at = new Date();
    product.status = 'paused';
    await product.save();

    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get farmer's own products
// @route   GET /api/products/my
// @access  Farmer
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      farmer_id: req.user._id,
      deleted_at: null,
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle product status (pause/unpause)
// @route   PATCH /api/products/:id/status
// @access  Farmer / Admin
const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, deleted_at: null });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.status = req.body.status || (product.status === 'active' ? 'paused' : 'active');
    await product.save();
    res.json({ message: `Product ${product.status}`, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed demo products (for development)
// @route   POST /api/products/seed
// @access  Public (dev only)
const seedProducts = async (req, res) => {
  try {
    const demoProducts = [
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Kiran Verma',
        farm_name: 'Nashik Orchards',
        farm_district: 'Nashik, Maharashtra',
        name: 'Heritage Strawberries',
        category: 'Fruits',
        description: 'Sweet, juicy, and freshly picked organic strawberries from our heritage farm.',
        unit: 'kg',
        price_per_unit: 250,
        mrp_per_unit: 300,
        stock_quantity: 50,
        harvest_date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        shelf_life_days: 3,
        storage_type: 'cold',
        is_organic: true,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC2OlDrUBvTKax7v8kvU1k_tJeJTSkIXOKkW5y4LdeyGa5o_dK4lYAMnNTo5Rn4_6pLyvU4qHUHRtz8gMzCTbZfh9eslzyhberLHeYBjzScdEDqDaOIq6b2Yn8dKtYmg7-EtqleYWzqI43SaM-OBNLzkdyqAKpDZjMH02KSSpEqFSmK3if14pFW-M29mlEsUX1s9Kw4IjsoWwMafpfXe6rvDyg2rNTRpmVos_mG165uH0D_lHPGoByDELsYwmRWMOISLZJv8uChSjqB'],
        tags: ['Organic', 'Harvested Today'],
        rating: 4.8,
        reviews_count: 124,
        distance: '12km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Ramesh Patel',
        farm_name: 'Green Valley Farms',
        farm_district: 'Mehsana, Gujarat',
        name: 'Tuscan Curly Kale',
        category: 'Vegetables',
        description: 'Nutrient-dense, crisp curly kale. Excellent for salads, smoothies, or baking.',
        unit: 'bunch',
        price_per_unit: 80,
        mrp_per_unit: 100,
        stock_quantity: 30,
        harvest_date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        shelf_life_days: 5,
        storage_type: 'cold',
        is_organic: true,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCM9cZYWfb5RjU3rhPFLpoRa9w8aUdffuLEzNVkIRynuKUVKP4M5KO6PffDsTrj5m_P7BShLW2e5iH88hMBJKT6ure8futBAJl14ey5fl0ztWFLRatBCIVdvx19D1HvhHUFxsBAdRxomibjQsFFnfq7EvSr_leEI6k4Qo5v3AC8CH0yRhK8kQ7mB2PH8Bn6z9S_gyixHMP8JLTytjyNqTqC2AAkCCJp-hzGy_OH_0JEN0o9Ti8GoEtVKfqWd72wrdgVU3z6EJ0y-Yyz'],
        tags: ['Fresh'],
        rating: 4.6,
        reviews_count: 89,
        distance: '8km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Anita Dairy',
        farm_name: 'Pure Pastures',
        farm_district: 'Anand, Gujarat',
        name: 'Buffalo Mozzarella',
        category: 'Dairy',
        description: 'Handcrafted, artisanal buffalo mozzarella. Creamy, soft, and perfect for salads.',
        unit: '250g',
        price_per_unit: 180,
        mrp_per_unit: 220,
        stock_quantity: 20,
        harvest_date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        shelf_life_days: 7,
        storage_type: 'cold',
        is_organic: false,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCW3n0_xxmcdA-nIsuUmnssw3hv_wqjdm1R3Z8R64Sv99--2BjhVw2gz0uRjF-oqIT1VfYLeS2W3LcgnUvS5MTWjOlbW7lkaak99teQ7Up499ZJOy_vzd3MPZn4TlsawfLVj5JsFrM3wm1SN3JG85LQoVCaAwqRGkYzA3p9YcGB8HuCDsFWLHfcdYL40vru5crAOtRR6jT05T2SDmlp1-QvMccdmPSd3SY9EDIjpO0pzyzoUsvtcy7q_AteL7fM6aUmkk0RRBwMYqfi'],
        tags: ['New Batch'],
        rating: 4.9,
        reviews_count: 210,
        distance: '18km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Suresh Grover',
        farm_name: 'Hillside Groves',
        farm_district: 'Pune, Maharashtra',
        name: 'Premium Hass Avocado',
        category: 'Fruits',
        description: 'Rich, buttery Hass avocados. Currently ripening, will be perfectly ready in 2-3 days.',
        unit: 'piece',
        price_per_unit: 120,
        mrp_per_unit: 150,
        stock_quantity: 60,
        harvest_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        shelf_life_days: 7,
        storage_type: 'ambient',
        is_organic: false,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBenbWIrerncQW5Jno0sxvEwEAUlqyV7JcJTL7vZIiklwBJPbZOmfNEh8RBnKGEZAtmFjvC4Gat93SnB-EwbIrbDRcGZtBPw3B72rji7iaIVrE2BAAroLs7AAtzZRDo3FB9Iywrvq2UsWWjqDq6kNpRJvaOa4HjtrwVcSJ8VaL1-xZLvJDY93bN49LFsEipAz4KLphGWO3nNfNhxwrdbLkfZdgQc8NnWROiVZX_81vhJgl8y3mAg5qWvjwG1qSLeOwQgs0ZMImXoEU1'],
        tags: ['Ripening'],
        rating: 4.5,
        reviews_count: 342,
        distance: '15km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Priya Iyer',
        farm_name: 'Summer Ridge',
        farm_district: 'Solapur, Maharashtra',
        name: 'Heirloom Tomato Mix',
        category: 'Vegetables',
        description: 'A colorful mix of vine-ripened heirloom tomatoes. Incredibly flavorful for salads.',
        unit: '500g',
        price_per_unit: 100,
        mrp_per_unit: 120,
        stock_quantity: 40,
        harvest_date: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
        shelf_life_days: 5,
        storage_type: 'ambient',
        is_organic: true,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB5fMIXV40ssldSmjcDMMEjh0SBlR-ne1l6ydQNU7YtHem12evPscPIoXwRoGmHehKVNd-uwAkvs3LTIZfQ8ADyPe-2HcVVIMNGKE-UpRKHJjGl1dUUq-qNTcFvTnHznbWNbW9vlhY_ErQkHp_RU1RAfyGI5YGCuEJTRNP4Dp_0Z75FxZ3_2VH7vW2k6KX6odXsHPr1NWFy2Jp8SwMLFQyEdpGhq01EljNp__z42_4Ysk664aL1ItrdH1xS4v4PhmntpdAOsr4FuWWS'],
        tags: ['Organic', 'Fresh'],
        rating: 4.7,
        reviews_count: 156,
        distance: '22km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Dev Sharma',
        farm_name: 'Bee Well Apiary',
        farm_district: 'Udaipur, Rajasthan',
        name: 'Wildflower Forest Honey',
        category: 'Pantry',
        description: 'Raw, unfiltered wildflower honey straight from the comb. Contains natural pollen.',
        unit: 'jar',
        price_per_unit: 350,
        mrp_per_unit: 420,
        stock_quantity: 25,
        harvest_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
        shelf_life_days: 365,
        storage_type: 'dry',
        is_organic: true,
        is_pesticide_free: true,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDMbD7UsZGBlNLt5GnbDh2tTW0GVO4bvU6PsEG5oyBhkt5PNa4pFJ4lh2d4QYPTHfv6KycFn_Y6Ci8IbG6j5uAWu_-hQMKA1VqTVQ5hmc-ufvPN2Gl0KjGiqxTCEYaxtyzdEF94m46q4d_JWr4kBD-2AqOeoI9hpNDIARmLpb53u24rrqKAmABY1HwnRsJu36O9EsLqvJH7nm-WKERfbp9w98OqBb2jKL0kqbYXr1jiez4LbN9MeTZWQNW_g5zZMA0CeBquUEIZzCGj'],
        tags: ['Pure Raw', 'Organic'],
        rating: 4.9,
        reviews_count: 521,
        distance: '30km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Meena Singh',
        farm_name: 'Root & Sprout',
        farm_district: 'Nashik, Maharashtra',
        name: 'Organic Spring Onions',
        category: 'Vegetables',
        description: 'Crisp, flavorful spring onions pulled from the soil this morning.',
        unit: 'bunch',
        price_per_unit: 30,
        mrp_per_unit: 40,
        stock_quantity: 80,
        harvest_date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        shelf_life_days: 4,
        storage_type: 'cold',
        is_organic: true,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDjOAVU6CTbbTCWmHAk1RYvus0ziGBX62LCKyvrYUfpUV8j0mJ1TWd85tNBkPBoIE5yPr_AD6IbqctDv0zk8dnUTjP7rnTUrzBsZIUPlE5dP37PTrlcd_TF9rQJz0xdCv_0RaNNubf1-XUoZ6riLwK5Ho_JkXsssooZRRHtLgp81Gg99p6hNUW9QC3NXPgt-u5eLuLu9BJRAgGlREAzPtSgMSTHPy3JblYGhv8rg8SJFXy_Om3CyLyvwn7F-F1O3Zli2POe7MV1dzGo'],
        tags: ['Organic', 'Fresh'],
        rating: 4.5,
        reviews_count: 67,
        distance: '5km away',
      },
      {
        farmer_id: req.body.farmer_id || '000000000000000000000001',
        farmer_name: 'Raj Bakers',
        farm_name: 'Grain & Fire',
        farm_district: 'Pune, Maharashtra',
        name: 'Heritage Sourdough',
        category: 'Bakery',
        description: 'Artisanal sourdough baked in a wood-fired oven using ancient grains.',
        unit: 'loaf',
        price_per_unit: 120,
        mrp_per_unit: 150,
        stock_quantity: 15,
        harvest_date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        shelf_life_days: 3,
        storage_type: 'ambient',
        is_organic: false,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAnPtvSyYTeiRDVLspZOFOig1d3RTm9VESnR5dMv7ATUePfDRbzbIb7mZkIxVWfHmcVO1FQN5zGm20iGGuLd8TaSm2yt1V5aiN59p7uXtQBbnmDVvrdLBrnI-k_G1DzasUHBL80HttbSN5bU50R3E-k8TDOjL2GL2sKyM7xWOtyjXm-RES_60SgI1FOj3OSHMQgKFoB9TAw_fW1n8bJk33VngZ-jTP3IkOr6p0BbOM4vcqSJuPx7w5AgHwXfx7ELVEupdZ5II5mbrhy'],
        tags: ['Baked Today'],
        rating: 4.8,
        reviews_count: 312,
        distance: '10km away',
      },
    ];

    await Product.deleteMany({});
    const inserted = [];
    for (const p of demoProducts) {
      const doc = await Product.create(p); // triggers pre('save') → freshness score
      inserted.push(doc);
    }
    res.json({ message: `${inserted.length} products seeded`, products: inserted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  toggleProductStatus,
  seedProducts,
};
