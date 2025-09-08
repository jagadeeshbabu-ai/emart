module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_this_in_production',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
  PORT: process.env.PORT || 5000
};

