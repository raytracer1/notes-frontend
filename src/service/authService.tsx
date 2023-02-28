import { apiInstance as Axios, apiInstanceToken as AxiosToken } from '../api/requestInterceptor';

//Login
const loginUser = (userName: string, passWord: string) => {
  return Axios.post('users/login', { username: userName, password: passWord } );
}

//Logout
const logoutUser = (token: string) => {
  return AxiosToken(token).get('users/logout');
}

export {
  loginUser,
  logoutUser,
};