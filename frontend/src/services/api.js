import axios from 'axios';

// ✅ Use correct port - Backend is on 5000, Frontend on 5174
const API_URL = 'https://fake-news-detectors-dkti.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Debug interceptors
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.code === 'ERR_NETWORK') {
      console.error('Cannot connect to backend at', API_URL);
      console.error('Make sure backend is running on port 5000');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  socialLogin: (providerData) => api.post('/auth/social-login', providerData),
  getMe: () => api.get('/auth/me'),
};

export const analysisAPI = {
  analyzeNews: (data) => api.post('/analysis/analyze', data),
  getHistory: (page = 1, limit = 20) => api.get(`/analysis/history?page=${page}&limit=${limit}`),
  getAnalysisStats: () => api.get('/analysis/stats'),
  getAnalysisById: (id) => api.get(`/analysis/${id}`),
  deleteAnalysis: (id) => api.delete(`/analysis/${id}`),
  clearAllHistory: () => api.delete('/analysis/history/clear'),
};

export default api;
