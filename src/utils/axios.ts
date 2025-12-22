import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // include /api/courses here
  headers: { 'Content-Type': 'application/json' },
});