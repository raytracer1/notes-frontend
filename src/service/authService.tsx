import {apiInstance as Axios} from '../api/requestInterceptor';

//Get users
const getUsers = () => {
  return Axios.get('users');
};

//Login
const loginUser = (email: string, password: string) => {
  return Axios.post('users/login', { params: { email, password } });
}


export {
  getUsers,
  loginUser,
};