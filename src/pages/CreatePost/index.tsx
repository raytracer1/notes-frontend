
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createPostAction
} from '../../store/reducers/space.reducer';
import PostEdit from "../../containers/PostEdit";

function CreatePost() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createStatus = useAppSelector((state) => state.space.createPost);
  const createErr = useAppSelector((state) => state.space.createPostErr);
  const post = useAppSelector((state) => state.space.post);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (createStatus === 'success') {
      navigate(`/space/${spaceId}/post/${post._id}/edit`);
    }
  // eslint-disable-next-line
  }, [createStatus, spaceId, post]);

  const handleClick = () => {
    if (spaceId) {
      dispatch(createPostAction({spaceId, title, description}));
    }
  }

  return (
    <PostEdit
      buttonTxt={'create'}
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