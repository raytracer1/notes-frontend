import { apiInstance as Axios } from '../api/requestInterceptor';

//Login
const loginUser = (email: string, passWord: string) => {
  return Axios.post('users/login', { email: email, password: passWord } );
}

//Logout
const logoutUser = () => {
  return Axios.get('users/logout');
}

const signupUser = (userName: string, email: string, passWord: string) => {
  return Axios.post('users/signup', { userName: userName, email: email, password: passWord });
}

export {
  loginUser,
  logoutUser,
  signupUser,
};