# Men's Clothing E-commerce Backend

A comprehensive Node.js/Express backend API for a men's clothing e-commerce website with MongoDB integration.

## Features

- **User Authentication**: Registration and login system with role-based access (Admin/User)
- **Product Management**: Full CRUD operations for products with image upload
- **Order Management**: Complete order processing and tracking system
- **Image Upload**: Multer integration for product image uploads
- **Admin Dashboard**: Statistics and inventory management
- **MongoDB Integration**: Mongoose ODM for database operations

## Installation

1. **Clone and navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```
Edit `.env` file with your MongoDB connection string and other configurations.

4. **Start MongoDB**
Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Seed the database (optional)**
```bash
npm run seed
```

6. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with optional category filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics

### File Upload
- `POST /api/upload` - Upload product images

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  mobile: String,
  address: String,
  role: String (user/admin),
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  category: String (shirts/tshirts/trousers/accessories),
  price: Number,
  image: String,
  description: String,
  sizes: [String],
  colors: [String],
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: Number,
    size: String,
    color: String,
    price: Number
  }],
  total: Number,
  status: String (pending/confirmed/shipped/delivered/cancelled),
  shippingAddress: String,
  paymentMethod: String (card/cod),
  createdAt: Date,
  updatedAt: Date
}
```

## File Upload

Product images are stored in the `uploads/` directory and served statically. Supported formats:
- JPEG, JPG, PNG, GIF, WebP
- Maximum file size: 5MB

## Default Users (after seeding)

- **Admin**: admin@menswear.com / admin123
- **User**: user@example.com / user123

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/menswear
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@menswear.com
ADMIN_PASSWORD=admin123
```

## Development

The backend uses:
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Production Deployment

1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update environment variables for production
3. Deploy to your preferred hosting platform (Heroku, AWS, etc.)
4. Ensure uploads directory is properly configured for your hosting environment

## Security Notes

- Passwords are stored in plain text for demo purposes - implement bcrypt hashing for production
- Add JWT authentication for enhanced security
- Implement rate limiting and input validation
- Use HTTPS in production
- Secure file upload validation