import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.170.70.3:3333',
});

export default api;
