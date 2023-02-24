import {apiInstance as Axios} from '../api/requestInterceptor';

//Get users
const getUsers = () => {
  return Axios.get('users');
};

//Login
const loginUser = (userName: string, passWord: string) => {
  return Axios.post('users/login', { username: userName, password: passWord } );
}

export {
  getUsers,
  loginUser,
};