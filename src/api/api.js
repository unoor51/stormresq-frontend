import axios from 'axios';

let baseURL = '';

if (window.location.hostname === 'localhost') {
  baseURL = 'http://127.0.0.1:8000/api';
} else if (window.location.hostname.includes('lightslategrey')) {
  baseURL = 'https://lightslategrey-termite-750324.hostingersite.com/api';
} else {
  baseURL = 'https://stormresq.com/api';
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;