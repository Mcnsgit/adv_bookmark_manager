// config/database.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmark-manager', {

        });
        
        // Test write operation
        const TestModel = mongoose.model('Test', new mongoose.Schema({ test: String }));
        await new TestModel({ test: 'connection test' }).save();
        await TestModel.deleteMany({ test: 'connection test' });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
      }
    };
    
    module.exports = connectDB;