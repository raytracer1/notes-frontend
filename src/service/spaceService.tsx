import { apiInstance as Axios } from '../api/requestInterceptor';

const getSpace = () => {
  return Axios.get('space');
}

const addSpace = (
  name: string,
  description: string,
  imageUrl: string,
  prerequisites: string[],
  keywords: string[]
) => {
  return Axios.post('space',
    {
      name: name,
      description: description,
      imageUrl: imageUrl,
      prerequisites: prerequisites,
      keywords: keywords
    }
  );
}

export {
  getSpace,
  addSpace,
};