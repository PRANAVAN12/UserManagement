import axios from 'axios';
import { baseUrl, timeout } from 'config/env';

const instance = axios.create({
  timeout,
  baseURL: baseUrl,
  headers: {
    Accept: 'text/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) =>
    error.response
      ? Promise.reject(error.response.data)
      : Promise.reject(error),
);

export default instance;
