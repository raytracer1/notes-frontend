import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getPostAction, updatePostAction
} from '../../store/reducers/space.reducer';
import PostEdit from "../../containers/PostEdit";

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPostStatus = useAppSelector((state) => state.space.getPost);
  const updateStatus = useAppSelector((state) => state.space.updatePost);
  const updateErr = useAppSelector((state) => state.space.updatePostErr);
  const post = useAppSelector((state) => state.space.post.post);

  const space = useAppSelector((state) => state.space.space.space);
  const user = useAppSelector((state) => state.auth.user);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (postId) {
      dispatch(getPostAction({postId: postId}));
    }
    // eslint-disable-next-line
  }, [postId]);

  useEffect(() => {
    if (getPostStatus === 'success' || updateStatus === 'success') {
      setTitle(post.title);
      setDescription(post.description);
    }
    if (getPostStatus === 'success' ) {
      if (user.userName !== space.author.userName) {
        navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [getPostStatus, updateStatus, post]);

  const handleClick = () => {
    if (postId) {
      dispatch(updatePostAction({postId, title, description}));
    }
  }

  return (
    <PostEdit
      buttonTxt={'modify'}
      backUrl={`/post/${postId}`}
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

export default EditPost;