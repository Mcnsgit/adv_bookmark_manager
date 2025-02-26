// FILE: shared/constants/errors.js

/**
 * Error codes for consistent API responses
 */
const ErrorCode = {
    SERVER_ERROR: 'SERVER_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    INVALID_ID: 'INVALID_ID',
    DUPLICATE_ERROR: 'DUPLICATE_ERROR',
    CONFLICT: 'CONFLICT'
  };
  
  /**
   * Default pagination constants
   */
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 20;
  const MAX_LIMIT = 100;
  
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
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    MAX_LIMIT,
    ERROR_MESSAGES
  };