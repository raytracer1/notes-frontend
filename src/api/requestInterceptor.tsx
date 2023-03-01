import axios from 'axios';

const baseURL = 'https://localhost:3444';
const getToken = () => {
  const token = localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user')!).token;
  return token;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    const store_token = getToken();
    if (!store_token) {
      return Promise.reject(error);
    }
    try {
      const res : any = await axios({
        url: baseURL + '/users/checkJWTToken',
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + store_token,
        }
      });
      return null;
    } catch (err) {
      return Promise.reject(err);
    }
  }
)

export const apiInstance = axiosInstance;
