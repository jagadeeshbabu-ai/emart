const mongoose = require('mongoose');
const Item = require('./models/Item');
const config = require('./config');

const sampleItems = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
    stock: 50
  },
  {
    name: 'MacBook Air M2',
    description: 'Lightweight laptop with M2 chip for ultimate performance',
    price: 1199,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop',
    stock: 30
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air cushioning',
    price: 150,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
    stock: 100
  },
  {
    name: 'Levi\'s 501 Jeans',
    description: 'Classic straight-fit jeans in blue denim',
    price: 89,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop',
    stock: 75
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
    stock: 200
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s masterpiece about justice and childhood',
    price: 14,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    stock: 150
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe',
    price: 79,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop',
    stock: 40
  },
  {
    name: 'Throw Pillow Set',
    description: 'Set of 4 decorative throw pillows for living room',
    price: 45,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    stock: 60
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for home workouts',
    price: 35,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    stock: 80
  },
  {
    name: 'Dumbbell Set',
    description: 'Adjustable dumbbell set for strength training',
    price: 199,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    stock: 25
  },
  {
    name: 'Skincare Set',
    description: 'Complete skincare routine with cleanser, toner, and moisturizer',
    price: 89,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop',
    stock: 45
  },
  {
    name: 'LEGO Creator Set',
    description: 'Build and rebuild 3 different models with this creative set',
    price: 49,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    stock: 90
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');
    
    // Insert sample items
    await Item.insertMany(sampleItems);
    console.log('Sample items inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

