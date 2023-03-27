import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSpaceAction, createPostAction
} from '../../store/reducers/space.reducer';
import PostEdit from "../../containers/PostEdit";

function CreatePost() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getSpaceStatus = useAppSelector((state) => state.space.getSpace);
  const createStatus = useAppSelector((state) => state.space.createPost);
  const createErr = useAppSelector((state) => state.space.createPostErr);
  const space = useAppSelector((state) => state.space.space.space);
  const user = useAppSelector((state) => state.auth.user);
  const post = useAppSelector((state) => state.space.post);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (spaceId) {
      dispatch(getSpaceAction({spaceId: spaceId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [spaceId]);

  useEffect(() => {
    if (getSpaceStatus === 'success') {
      if (user.userName !== space.author.userName) {
        navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [getSpaceStatus, space, user]);

  useEffect(() => {
    if (createStatus === 'success') {
      navigate(`/post/${post._id}/edit`);
    }
  // eslint-disable-next-line
  }, [createStatus, post]);

  const handleClick = () => {
    if (spaceId) {
      dispatch(createPostAction({spaceId, title, description}));
    }
  }

  return (
    <PostEdit
      buttonTxt={'create'}
      backUrl={`/space/${spaceId}`}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      handleClick={handleClick}
      disabled={createStatus === 'pending'}
      status={createStatus}
      error={createErr}
    />
  );
}

export default CreatePost;