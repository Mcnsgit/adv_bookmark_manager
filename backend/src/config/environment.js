const dotenv = require('dotenv');
dotenv.config();


const environment = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmark-manager',
    JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    CLIENT_ID: process.env.CLIENT_ID || 'default-client-id',
    CLIENT_SECRET: process.env.CLIENT_SECRET || 'default-client-secret',
    CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:5173/auth/callback',
    REDIRECT_URL: process.env.REDIRECT_URL || 'http://localhost:5173/auth/callback'
  };
  
module.exports = environment;