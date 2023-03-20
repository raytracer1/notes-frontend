import { apiInstance as Axios } from '../api/requestInterceptor';

const getSpaces = () => {
  return Axios.get('space');
}

const createSpace = (
  name: string,
  description: string,
  prerequisites: string[],
  keywords: string[],
  imageUrl?: string,
) => {
  return Axios.post('space',
    {
      name: name,
      description: description,
      prerequisites: prerequisites,
      keywords: keywords,
      imageUrl: imageUrl,
    }
  );
}

const getSpace = (spaceId: string) => {
  return Axios.get(`space/${spaceId}`);
}

const updateSpace = (
  spaceId: string,
  name: string,
  description: string,
  prerequisites: string[],
  keywords: string[],
  imageUrl?: string,
) => {
  return Axios.post(`space/${spaceId}`,
    {
      name: name,
      description: description,
      prerequisites: prerequisites,
      keywords: keywords,
      imageUrl: imageUrl,
    }
  );
}

const joinSpace = (spaceId: string) => {
  return Axios.post(`join/${spaceId}`);
}

const leaveSpace = (spaceId: string) => {
  return Axios.delete(`join/${spaceId}`);
}

export {
  getSpaces,
  createSpace,
  getSpace,
  joinSpace,
  leaveSpace,
  updateSpace
};