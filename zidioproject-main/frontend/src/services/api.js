import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardData = async () => {
  const res = await API.get('/user/dashboard');
  return res.data;
};

export const uploadExcelFile = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await API.post('/user/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return res.data;
};

export default API;
