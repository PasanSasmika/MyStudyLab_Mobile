import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.error('❌ EXPO_PUBLIC_API_URL is missing!');
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default api;