import { apiInstance as Axios } from '../api/requestInterceptor';

const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return Axios.post('image', formData);
}

export {
  uploadImage,
};