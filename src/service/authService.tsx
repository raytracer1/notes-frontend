import {apiInstance as Axios} from '../api/requestInterceptor';

//Login
const loginUser = (userName: string, passWord: string) => {
  return Axios.post('users/login', { username: userName, password: passWord } );
}

//Logout
const logoutUser = () => {
  return Axios.get('users/logout');
}

export {
  loginUser,
  logoutUser,
};