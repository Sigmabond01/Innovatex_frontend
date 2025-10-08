import axios from 'axios';

// The URL where your backend server is running
const API_URL = 'https://innovatex-backend-dr9l.onrender.com';

const apiClient = axios.create({
  baseURL: API_URL,
});

// A helper function to get the full URL for images stored on the backend
export const getImageUrl = (path) => {
  if (!path) return ''; // Return empty string if path is not provided
  return `${API_URL}/${path.replace(/\\/g, '/')}`; // Handles Windows-style backslashes
};

export default apiClient;