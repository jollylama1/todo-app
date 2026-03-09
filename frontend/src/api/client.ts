import axios from 'axios';

// Basic Axios instance for the backend API.
// Adjust baseURL and ports as needed to match your backend.
export const apiClient = axios.create({
  baseURL: 'http://localhost:5243/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

