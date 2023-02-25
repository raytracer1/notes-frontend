import {apiInstance as Axios} from '../api/requestInterceptor';

//Login
const loginUser = (userName: string, passWord: string) => {
  return Axios.post('users/login', { username: userName, password: passWord } );
}

export {
  loginUser,
};