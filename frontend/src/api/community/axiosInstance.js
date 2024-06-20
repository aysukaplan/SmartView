import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/community', // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
