import { apiInstance as Axios } from '../api/requestInterceptor';

const getSpaces = () => {
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

const getSpace = (spaceId: string) => {
  return Axios.get(`space/${spaceId}`);
}

const joinSpace = (spaceId: string) => {
  return Axios.post(`join/${spaceId}`);
}

const leaveSpace = (spaceId: string) => {
  return Axios.delete(`join/${spaceId}`);
}

export {
  getSpaces,
  addSpace,
  getSpace,
  joinSpace,
  leaveSpace,
};