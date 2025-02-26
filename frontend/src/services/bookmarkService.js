// src/services/bookmarkService.ts
import api from './api';

export const bookmarkService = {
  getAllBookmarks: () => api.get('/bookmarks'),
  getBookmark: (_id) => api.get(`/bookmarks/${_id}`),
  createBookmark: (data) => api.post('/bookmarks', data),
  updateBookmark: (_id, data) => api.put(`/bookmarks/${_id}`, data),
  deleteBookmark: (_id) => api.delete(`/bookmarks/${_id}`),
  getReadingList: () => api.get('/bookmarks/reading-list'),
};