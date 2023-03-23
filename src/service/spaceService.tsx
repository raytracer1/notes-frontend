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

const createPost = (
  spaceId: string,
  title: string,
  description: string,
) => {
  return Axios.post(`space/${spaceId}/post`,
    {
      title: title,
      description: description,
    }
  );
}

const getPost = (
  spaceId: string,
  postId: string,
) => {
  return Axios.get(`space/${spaceId}/post/${postId}`);
}

const updatePost = (
  spaceId: string,
  postId: string,
  title: string,
  description: string,
) => {
  return Axios.post(`space/${spaceId}/post/${postId}`,
    {
      title: title,
      description: description,
    }
  );
}

const getPosts = (
  spaceId: string,
) => {
  return Axios.get(`space/${spaceId}/post`);
}

const getComments = (
  spaceId: string,
) => {
  return Axios.get(`space/${spaceId}/comment`);
}

const createComment = (
  spaceId: string,
  content: string,
) => {
  return Axios.post(`space/${spaceId}/comment`,
    {
      content: content,
    }
  );
}

export {
  getSpaces,
  createSpace,
  getSpace,
  joinSpace,
  leaveSpace,
  updateSpace,
  createPost,
  getPost,
  updatePost,
  getPosts,
  getComments,
  createComment
};