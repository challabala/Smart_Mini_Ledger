import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://smartminiledger.netlify.app/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT Token if it exists in local storage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catch 401 errors for auto-logout
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error logger for easier debugging
    console.error(
      `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`,
      error.response?.data || error.message
    );

    if (error.response && error.response.status === 401) {
      // Clear local session storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Dispatch a custom logout event so components (like AuthProvider) can react
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
