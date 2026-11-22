import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 10000
});

// Interceptor para agregar token JWT en rutas protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('parnet_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar expiración de token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('parnet_token');
      localStorage.removeItem('parnet_user');
    }
    return Promise.reject(error);
  }
);

export default api;

