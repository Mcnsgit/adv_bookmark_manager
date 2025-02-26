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
const bodyParser = require('body-parser');
const folderRoutes = require('./routes/folders');
//const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');
const errorMiddleware = require('./middleware/errorMiddleware')
const { body } = require('express-validator');
const connectDB = require('./config/database');
// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Initialize express app
const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Add a simple ping endpoint
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});
app.get('/', (req, res) => {
  res.json({
    message: 'Bookmark Manager API is running',
    version: '1.0.0',
    status: 'OK'
  });
});
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/folders', folderRoutes);
//app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.use('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorMiddleware.handleErrors)

// Connect to database
connectDB()
  .then(() => {
    // Start server only after successful DB connection
    const port = process.env.PORT || 3000;
    http.createServer(app)
      .listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });