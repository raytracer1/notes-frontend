import axios from 'axios';
import { baseURL } from '../config';
 
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiInstance = axiosInstance;
