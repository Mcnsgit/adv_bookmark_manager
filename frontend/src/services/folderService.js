import api from './api';

export const folderService = {
  // Get all folders
  getAllFolders: (nested = false) => {
    return api.get(`/folders?nested=${nested}`);
  },
  
  // Get a specific folder
  getFolder: (id) => {
    return api.get(`/folders/${id}`);
  },
  
  // Create a new folder
  createFolder: (data) => {
    return api.post('/folders', data);
  },
  
  // Update an existing folder
  updateFolder: (id, data) => {
    return api.put(`/folders/${id}`, data);
  },
  
  // Delete a folder
  deleteFolder: (id) => {
    return api.delete(`/folders/${id}`);
  },
  
  // Get bookmarks in a folder
  getFolderBookmarks: (id, options = {}) => {
    const { page, limit, sort_by, sort_order } = options;
    let url = `/folders/${id}/bookmarks`;
    
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (sort_by) params.append('sort_by', sort_by);
    if (sort_order) params.append('sort_order', sort_order);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return api.get(url);
  },
  
  // Add a bookmark to a folder
  addBookmarkToFolder: (bookmarkId, folderId) => {
    return api.post(`/folders/${folderId}/bookmarks/${bookmarkId}`);
  },
  
  // Remove a bookmark from a folder
  removeBookmarkFromFolder: (bookmarkId, folderId) => {
    return api.delete(`/folders/${folderId}/bookmarks/${bookmarkId}`);
  },
  
  // Get all folders that contain a specific bookmark
  getBookmarkFolders: (bookmarkId) => {
    return api.get(`/folders/bookmark/${bookmarkId}`);
  }
};

export default folderService;