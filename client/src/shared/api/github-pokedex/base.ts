import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: 'http://localhost:5005/api',
});
