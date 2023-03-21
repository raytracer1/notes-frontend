
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getPostAction, updatePostAction
} from '../../store/reducers/space.reducer';
import PostEdit from "../../containers/PostEdit";

function CreatePost() {
  const { spaceId, postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPostStatus = useAppSelector((state) => state.space.getPost);
  const updateStatus = useAppSelector((state) => state.space.updatePost);
  const updateErr = useAppSelector((state) => state.space.updatePostErr);
  const post = useAppSelector((state) => state.space.post);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (spaceId && postId) {
      dispatch(getPostAction({spaceId: spaceId, postId: postId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [spaceId, postId]);

  useEffect(() => {
    if (getPostStatus === 'success' || updateStatus === 'success') {
      setTitle(post.title);
      setDescription(post.description);
    }
    // eslint-disable-next-line
  }, [getPostStatus, updateStatus, post]);

  const handleClick = () => {
    if (spaceId && postId) {
      dispatch(updatePostAction({spaceId, postId, title, description}));
    }
  }

  return (
    <PostEdit
      buttonTxt={'modify'}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      handleClick={handleClick}
      disabled={updateStatus === 'pending'}
      status={updateStatus}
      error={updateErr}
    />
  );
}

export default CreatePost;