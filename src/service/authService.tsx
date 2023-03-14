import { apiInstance as Axios } from '../api/requestInterceptor';

//Login
const loginUser = (email: string, passWord: string) => {
  return Axios.post('user/login', { email: email, password: passWord } );
}

//Logout
const logoutUser = () => {
  return Axios.get('user/logout');
}

const signupUser = (userName: string, email: string, passWord: string) => {
  return Axios.post('user/signup', { userName: userName, email: email, password: passWord });
}

const updateUser = (gender: string, country: string, interests: string[], imgUrl?: string ) => {
  return Axios.post('user/update', { gender: gender, country: country, interests: interests, imageUrl: imgUrl });
}

const refreshUser = () => {
  return Axios.get('user/refresh');
}

export {
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  refreshUser,
};