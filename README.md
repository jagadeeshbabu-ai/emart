# E-Commerce Web Application

A full-stack e-commerce web application built with Node.js/Express backend and React frontend, featuring JWT authentication, product management, and shopping cart functionality.

## Features

### Backend
- **JWT Authentication**: Secure user registration and login
- **CRUD APIs for Items**: Create, read, update, and delete products
- **Advanced Filtering**: Filter products by category, price range, and search terms
- **Shopping Cart APIs**: Add, remove, update, and clear cart items
- **MongoDB Integration**: Persistent data storage
- **Input Validation**: Comprehensive validation using express-validator

### Frontend
- **React SPA**: Modern single-page application
- **Authentication Pages**: Login and registration forms
- **Product Listing**: Browse products with advanced filters
- **Shopping Cart**: Add/remove items with quantity controls
- **Cart Persistence**: Cart items persist after logout using localStorage
- **Responsive Design**: Mobile-friendly interface
- **Context API**: State management for authentication and cart

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS for cross-origin requests

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-app
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install-all
```

### 3. Database Setup
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update the MONGODB_URI in backend/config.js
```

### 4. Seed the database (optional)
```bash
cd backend
node seedData.js
```

### 5. Start the application
```bash
# Start both backend and frontend
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Items
- `GET /api/items` - Get all items with filters
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create item (admin)
- `PUT /api/items/:id` - Update item (admin)
- `DELETE /api/items/:id` - Delete item (admin)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update` - Update item quantity (protected)
- `DELETE /api/cart/remove/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

## Usage

### 1. Register/Login
- Visit the application at `http://localhost:3000`
- Click "Register" to create a new account
- Or click "Login" if you already have an account

### 2. Browse Products
- View all products on the home page
- Use filters to search by category, price range, or keywords
- Sort products by various criteria

### 3. Add to Cart
- Click "Add to Cart" on any product
- Items are added to your cart
- Cart persists even after logout (stored in localStorage)

### 4. Manage Cart
- Click the cart icon in the navigation
- Adjust quantities or remove items
- View order summary with total

## Configuration

### Backend Configuration
Update `backend/config.js`:
```javascript
module.exports = {
  JWT_SECRET: 'your-secret-key-here',
  MONGODB_URI: 'mongodb://localhost:27017/ecommerce',
  PORT: 5000
};
```

### Environment Variables
Create a `.env` file in the backend directory:
```
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
```

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── items.js
│   │   └── cart.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config.js
│   ├── server.js
│   ├── seedData.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ItemCard.js
│   │   │   └── Filters.js
│   │   ├── contexts/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Cart.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
└── README.md
```

## Features in Detail

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and API endpoints
- User session management

### Product Management
- Full CRUD operations for products
- Advanced filtering and search
- Category-based organization
- Image support with placeholder fallbacks

### Shopping Cart
- Add/remove items with quantity controls
- Real-time cart updates
- Persistent storage (localStorage for guests, database for users)
- Order summary with totals

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Cross-browser compatibility

## Development

### Adding New Features
1. Backend: Add new routes in the `routes/` directory
2. Frontend: Create new components in the `src/components/` directory
3. Update contexts for state management
4. Add new pages in the `src/pages/` directory

### Database Schema
- **Users**: name, email, password, timestamps
- **Items**: name, description, price, category, image, stock, timestamps
- **Cart**: userId, items array with itemId and quantity, timestamps

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running
2. **CORS Issues**: Check backend CORS configuration
3. **JWT Token Issues**: Verify JWT_SECRET is set
4. **Port Conflicts**: Change ports in config files

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment.

## License

MIT License - feel free to use this project for learning and development purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please create an issue in the repository or contact the development team.

