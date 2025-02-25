const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks');
//const folderRoutes = require('./routes/folders');
//const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Add a simple ping endpoint
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
//app.use('/api/folders', folderRoutes);
//app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookmark-manager')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const port = process.env.PORT || 3000;
http.createServer(app)
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });