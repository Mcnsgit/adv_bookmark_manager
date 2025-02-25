// FILE: frontend/src/services/api.js
import axios from 'axios';
import { BASE_API_URL, API_VERSION } from '../../shared/constants/api';

/**
 * Axios instance configured for API requests
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: `${BASE_API_URL}/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Cache the token for performance
let cachedToken = localStorage.getItem('auth_token');
// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        if (cachedToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${cachedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Centralized error handling function
const handleResponseError = (error) => {
    if (error.response?.status === 401) {
        // Redirect to login or refresh token
        localStorage.removeItem('auth_token');
        cachedToken = null; // Clear the cached token
        // Use a navigation method here instead of direct URL manipulation
        // For example, if using React Router:
        // history.push('/login');
        window.location.href = '/login'; // Replace with navigation method
    }
    return Promise.reject(error);
};
// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    handleResponseError
);
export default api;