import { apiInstance as Axios } from '../api/requestInterceptor';

//Login
const loginUser = (userName: string, passWord: string) => {
  return Axios.post('users/login', { username: userName, password: passWord } );
}

//Logout
const logoutUser = () => {
  return Axios.get('users/logout');
}

const signupUser = (userName: string, email: string, passWord: string) => {
  return Axios.post('users/signup', { username: userName, email: email, password: passWord });
}

export {
  loginUser,
  logoutUser,
  signupUser,
};