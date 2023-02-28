import axios from 'axios';

const axiosInstance = axios.create({
  // The base URL,it will be replaced when APIs is readly 
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiInstance = axiosInstance;

const axiosInstanceWithToken = (token: string) => {
  return axios.create({
    // The base URL,it will be replaced when APIs is readly 
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
};

export const apiInstanceToken = axiosInstanceWithToken;