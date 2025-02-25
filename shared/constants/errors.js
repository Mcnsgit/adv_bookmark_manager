// FILE: shared/constants/errors.js

/**
 * Error codes
 * @enum {string}
 */
const ErrorCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE',
    SERVER_ERROR: 'SERVER_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  };
  
  /**
   * Error messages
   * @type {Object}
   */
  const ERROR_MESSAGES = {
    [ErrorCode.UNAUTHORIZED]: 'You are not authorized to perform this action',
    [ErrorCode.NOT_FOUND]: 'The requested resource was not found',
    [ErrorCode.VALIDATION_ERROR]: 'The provided data is invalid',
    [ErrorCode.DUPLICATE_RESOURCE]: 'A resource with these properties already exists',
    [ErrorCode.SERVER_ERROR]: 'An unexpected error occurred',
    [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please try again later',
  };
  
  module.exports = {
    ErrorCode,
    ERROR_MESSAGES
  };