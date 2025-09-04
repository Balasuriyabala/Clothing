const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/menswear', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['shirts', 'tshirts', 'trousers', 'accessories'], 
    required: true 
  },
  sleeveType: {
    type: String,
    enum: ['full-sleeve', 'half-sleeve', 'sleeveless'],
    required: function() {
      return this.category === 'shirts' || this.category === 'tshirts';
    }
  },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@menswear.com',
      password: 'admin123',
      mobile: '9876543210',
      address: '123 Admin Street, City',
      role: 'admin'
    });

    // Create regular user
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      mobile: '9876543211',
      address: '456 User Avenue, City',
      role: 'user'
    });

    await adminUser.save();
    await regularUser.save();

    // Create sample products
    const products = [
      // Shirts
      {
        name: 'Classic White Formal Shirt',
        category: 'shirts',
        sleeveType: 'full-sleeve',
        price: 1299,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Premium cotton formal shirt perfect for office and formal occasions',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Light Blue', 'Black'],
        stock: 50
      },
      {
        name: 'Casual Cotton Shirt',
        category: 'shirts',
        sleeveType: 'half-sleeve',
        price: 899,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Comfortable cotton shirt for casual wear',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Grey', 'Green'],
        stock: 30
      },
      {
        name: 'Linen Full Sleeve Shirt',
        category: 'shirts',
        sleeveType: 'full-sleeve',
        price: 1599,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Breathable linen shirt perfect for Indian summers',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beige', 'White', 'Light Grey'],
        stock: 25
      },
      // T-Shirts
      {
        name: 'Premium Cotton T-Shirt',
        category: 'tshirts',
        sleeveType: 'half-sleeve',
        price: 599,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Soft cotton t-shirt with modern fit',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Grey', 'Navy'],
        stock: 100
      },
      {
        name: 'Full Sleeve T-Shirt',
        category: 'tshirts',
        sleeveType: 'full-sleeve',
        price: 699,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Comfortable full sleeve t-shirt for all seasons',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Maroon'],
        stock: 75
      },
      {
        name: 'Sleeveless Vest',
        category: 'tshirts',
        sleeveType: 'sleeveless',
        price: 399,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Cotton sleeveless vest for gym and casual wear',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Grey'],
        stock: 60
      },
      // Trousers
      {
        name: 'Formal Dress Pants',
        category: 'trousers',
        price: 1499,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Tailored dress pants for professional wear',
        sizes: ['30', '32', '34', '36', '38', '40'],
        colors: ['Black', 'Navy', 'Charcoal'],
        stock: 40
      },
      {
        name: 'Casual Chinos',
        category: 'trousers',
        price: 999,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Comfortable chinos for everyday wear',
        sizes: ['30', '32', '34', '36', '38'],
        colors: ['Khaki', 'Navy', 'Olive'],
        stock: 60
      },
      // Accessories
      {
        name: 'Leather Belt',
        category: 'accessories',
        price: 799,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Genuine leather belt with classic buckle',
        sizes: ['32', '34', '36', '38', '40'],
        colors: ['Black', 'Brown'],
        stock: 25
      },
      {
        name: 'Classic Watch',
        category: 'accessories',
        price: 2999,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Elegant timepiece for the modern gentleman',
        sizes: ['One Size'],
        colors: ['Silver', 'Gold', 'Black'],
        stock: 15
      }
    ];

    await Product.insertMany(products);

    console.log('✅ Database seeded successfully!');
    console.log('👤 Admin User: admin@menswear.com / admin123');
    console.log('👤 Regular User: user@example.com / user123');
    console.log(`📦 ${products.length} products created`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();