import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

// Example interceptor for logging errors
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);
