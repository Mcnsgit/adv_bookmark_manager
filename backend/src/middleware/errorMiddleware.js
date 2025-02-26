// middleware/errorMiddleware.js
//const { ErrorCode } = require('../../../shared/constants/errors');

const errorMiddleware = {
    /**
     * Central error handler
     */
    handleErrors(err, req, res, next) {
      console.error('Error:', err);
    
    // Default error status and message
    let status = err.status || 500;
    let message = err.message || 'Internal server error';
    
 
  // Send the error response
  res.status(status).json({
    success: false,
    message,
    // Include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}
};

module.exports = errorMiddleware;