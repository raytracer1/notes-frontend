import { apiInstance as Axios } from '../api/requestInterceptor';

const getProfile = (username: string) => {
  return Axios.get(`user/${username}`);
}

export {
    getProfile,
};