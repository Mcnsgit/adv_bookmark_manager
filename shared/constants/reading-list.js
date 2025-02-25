// FILE: shared/constants/reading-list.js

/**
 * Reading priority levels
 * @enum {number}
 */
const ReadingPriority = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };
  
  /**
   * Labels for reading priority levels
   * @type {Object}
   */
  const READING_PRIORITY_LABELS = {
    [ReadingPriority.LOW]: 'Low',
    [ReadingPriority.MEDIUM]: 'Medium',
    [ReadingPriority.HIGH]: 'High',
  };
  
  module.exports = {
    ReadingPriority,
    READING_PRIORITY_LABELS
  };
  