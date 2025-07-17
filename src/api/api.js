import axios from 'axios';

const api = axios.create({
  baseURL: 'https://stormresq.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;