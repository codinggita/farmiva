const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const Product = require('./src/models/Product');

  function calcScore(p) {
    let score = 0;
    const days = Math.max(0, (Date.now() - new Date(p.harvest_date)) / 86400000);
    if (days < 1) score += 40;
    else if (days < 2) score += 35;
    else if (days < 3) score += 28;
    else if (days < 5) score += 20;
    else if (days < 7) score += 12;
    else score += Math.max(0, 10 - days);
    score += 15; // seasonal
    if (p.storage_type === 'cold') score += 20;
    else if (p.storage_type === 'dry') score += 15;
    else score += 10;
    score += Math.round(((p.rating || 0) / 5) * 20) || 15;
    return Math.min(100, Math.round(score));
  }

  const now = Date.now();
  const h = 3600000;
  const d = 86400000;

  const items = [
    { farmer_name: 'Kiran Verma', farm_name: 'Nashik Orchards', farm_district: 'Nashik, Maharashtra', name: 'Heritage Strawberries', category: 'Fruits', description: 'Sweet, juicy, and freshly picked organic strawberries.', unit: 'kg', price_per_unit: 250, mrp_per_unit: 300, stock_quantity: 50, harvest_date: new Date(now - 6 * h), shelf_life_days: 3, storage_type: 'cold', is_organic: true, images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&q=80'], tags: ['Organic', 'Harvested Today'], rating: 4.8, reviews_count: 124, distance: '12km away' },
    { farmer_name: 'Ramesh Patel', farm_name: 'Green Valley Farms', farm_district: 'Mehsana, Gujarat', name: 'Tuscan Curly Kale', category: 'Vegetables', description: 'Crisp, nutrient-dense curly kale. Perfect for salads.', unit: 'bunch', price_per_unit: 80, mrp_per_unit: 100, stock_quantity: 30, harvest_date: new Date(now - 24 * h), shelf_life_days: 5, storage_type: 'cold', is_organic: true, images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80'], tags: ['Fresh'], rating: 4.6, reviews_count: 89, distance: '8km away' },
    { farmer_name: 'Anita Dairy', farm_name: 'Pure Pastures', farm_district: 'Anand, Gujarat', name: 'Buffalo Mozzarella', category: 'Dairy', description: 'Handcrafted artisanal buffalo mozzarella.', unit: '250g', price_per_unit: 180, mrp_per_unit: 220, stock_quantity: 20, harvest_date: new Date(now - 4 * h), shelf_life_days: 7, storage_type: 'cold', is_organic: false, images: ['https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&q=80'], tags: ['New Batch'], rating: 4.9, reviews_count: 210, distance: '18km away' },
    { farmer_name: 'Suresh Grover', farm_name: 'Hillside Groves', farm_district: 'Pune, Maharashtra', name: 'Premium Hass Avocado', category: 'Fruits', description: 'Rich, buttery Hass avocados.', unit: 'piece', price_per_unit: 120, mrp_per_unit: 150, stock_quantity: 60, harvest_date: new Date(now - 3 * d), shelf_life_days: 7, storage_type: 'ambient', is_organic: false, images: ['https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=500&q=80'], tags: ['Ripening'], rating: 4.5, reviews_count: 342, distance: '15km away' },
    { farmer_name: 'Priya Iyer', farm_name: 'Summer Ridge', farm_district: 'Solapur, Maharashtra', name: 'Heirloom Tomato Mix', category: 'Vegetables', description: 'Vine-ripened colorful heirloom tomatoes.', unit: '500g', price_per_unit: 100, mrp_per_unit: 120, stock_quantity: 40, harvest_date: new Date(now - 18 * h), shelf_life_days: 5, storage_type: 'ambient', is_organic: true, images: ['https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=500&q=80'], tags: ['Organic', 'Fresh'], rating: 4.7, reviews_count: 156, distance: '22km away' },
    { farmer_name: 'Dev Sharma', farm_name: 'Bee Well Apiary', farm_district: 'Udaipur, Rajasthan', name: 'Wildflower Forest Honey', category: 'Pantry', description: 'Raw, unfiltered wildflower honey.', unit: 'jar', price_per_unit: 350, mrp_per_unit: 420, stock_quantity: 25, harvest_date: new Date(now - 7 * d), shelf_life_days: 365, storage_type: 'dry', is_organic: true, is_pesticide_free: true, images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80'], tags: ['Pure Raw', 'Organic'], rating: 4.9, reviews_count: 521, distance: '30km away' },
    { farmer_name: 'Meena Singh', farm_name: 'Root & Sprout', farm_district: 'Nashik, Maharashtra', name: 'Organic Spring Onions', category: 'Vegetables', description: 'Crisp spring onions pulled this morning.', unit: 'bunch', price_per_unit: 30, mrp_per_unit: 40, stock_quantity: 80, harvest_date: new Date(now - 5 * h), shelf_life_days: 4, storage_type: 'cold', is_organic: true, images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80'], tags: ['Organic', 'Fresh'], rating: 4.5, reviews_count: 67, distance: '5km away' },
    { farmer_name: 'Raj Bakers', farm_name: 'Grain & Fire', farm_district: 'Pune, Maharashtra', name: 'Heritage Sourdough', category: 'Bakery', description: 'Artisanal sourdough baked in a wood-fired oven.', unit: 'loaf', price_per_unit: 120, mrp_per_unit: 150, stock_quantity: 15, harvest_date: new Date(now - 3 * h), shelf_life_days: 3, storage_type: 'ambient', is_organic: false, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80'], tags: ['Baked Today'], rating: 4.8, reviews_count: 312, distance: '10km away' },
    { farmer_name: 'Arjun Farms', farm_name: 'Arjun Organic', farm_district: 'Coimbatore, Tamil Nadu', name: 'Baby Spinach', category: 'Vegetables', description: 'Tender baby spinach leaves, rich in iron.', unit: 'bunch', price_per_unit: 60, mrp_per_unit: 80, stock_quantity: 50, harvest_date: new Date(now - 8 * h), shelf_life_days: 3, storage_type: 'cold', is_organic: true, images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80'], tags: ['Organic', 'Baby Leaves'], rating: 4.6, reviews_count: 78, distance: '7km away' },
    { farmer_name: 'Sunita Verma', farm_name: 'Mango Paradise', farm_district: 'Ratnagiri, Maharashtra', name: 'Alphonso Mangoes', category: 'Fruits', description: 'GI-tagged premium Alphonso mangoes.', unit: 'kg', price_per_unit: 400, mrp_per_unit: 500, stock_quantity: 30, harvest_date: new Date(now - 12 * h), shelf_life_days: 5, storage_type: 'ambient', is_organic: false, images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80'], tags: ['GI Tagged', 'Premium'], rating: 4.9, reviews_count: 445, distance: '85km away' },
    { farmer_name: 'Ram Gopal', farm_name: 'Pure Milk Dairy', farm_district: 'Jaipur, Rajasthan', name: 'A2 Desi Cow Milk', category: 'Dairy', description: 'Fresh A2 milk from indigenous Gir cows.', unit: 'litre', price_per_unit: 90, mrp_per_unit: 110, stock_quantity: 100, harvest_date: new Date(now - 2 * h), shelf_life_days: 2, storage_type: 'cold', is_organic: true, images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80'], tags: ['A2 Milk', 'Fresh Morning'], rating: 4.7, reviews_count: 289, distance: '20km away' },
    { farmer_name: 'Kavita Patil', farm_name: 'Spice Garden', farm_district: 'Guntur, Andhra Pradesh', name: 'Organic Turmeric Powder', category: 'Pantry', description: 'Stone-ground turmeric from single-origin farm.', unit: '500g', price_per_unit: 180, mrp_per_unit: 220, stock_quantity: 45, harvest_date: new Date(now - 30 * d), shelf_life_days: 365, storage_type: 'dry', is_organic: true, is_pesticide_free: true, images: ['https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&q=80'], tags: ['Organic', 'Single Origin'], rating: 4.8, reviews_count: 193, distance: '250km away' },
  ];

  await Product.deleteMany({});
  const inserted = [];
  for (const item of items) {
    item.freshness_score = calcScore(item);
    const doc = await Product.create(item);
    inserted.push(doc);
    console.log(' ✓', doc.name, '| Score:', doc.freshness_score);
  }
  console.log('\nTotal seeded:', inserted.length);
  await mongoose.disconnect();
}

seed().catch(e => { console.error('SEED ERROR:', e.message); process.exit(1); });
