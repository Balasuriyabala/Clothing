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
        name: 'Classic White Dress Shirt',
        category: 'shirts',
        price: 79.99,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Premium cotton dress shirt perfect for formal occasions',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Light Blue', 'Black'],
        stock: 50
      },
      {
        name: 'Casual Linen Shirt',
        category: 'shirts',
        price: 65.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Breathable linen shirt for casual summer days',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beige', 'Light Grey', 'Navy'],
        stock: 30
      },
      // T-Shirts
      {
        name: 'Premium Cotton T-Shirt',
        category: 'tshirts',
        price: 29.99,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Soft cotton t-shirt with modern fit',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Grey', 'Navy'],
        stock: 100
      },
      {
        name: 'Graphic Print Tee',
        category: 'tshirts',
        price: 35.99,
        image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Trendy graphic print t-shirt',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White'],
        stock: 75
      },
      // Trousers
      {
        name: 'Formal Dress Pants',
        category: 'trousers',
        price: 89.99,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Tailored dress pants for professional wear',
        sizes: ['30', '32', '34', '36', '38', '40'],
        colors: ['Black', 'Navy', 'Charcoal'],
        stock: 40
      },
      {
        name: 'Casual Chinos',
        category: 'trousers',
        price: 59.99,
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
        price: 49.99,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
        description: 'Genuine leather belt with classic buckle',
        sizes: ['32', '34', '36', '38', '40'],
        colors: ['Black', 'Brown'],
        stock: 25
      },
      {
        name: 'Classic Watch',
        category: 'accessories',
        price: 199.99,
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