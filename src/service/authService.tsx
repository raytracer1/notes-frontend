import {apiInstance as Axios} from '../api/requestInterceptor';

//Get the upload file data
const getUsers = () => {
  console.log("getUsers");
  return Axios.get('users');
};

export {
  getUsers,
};