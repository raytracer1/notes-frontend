import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSpaceAction, getPostAction,
} from '../../store/reducers/space.reducer';
import { ReactComponent as IconBackLeft }  from '../../assets/svg/back-left.svg';
import Spinner from "../../components/Spinner";
import './style.scss';


function Post() {
  const { spaceId, postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPostStatus = useAppSelector((state) => state.space.getPost);
  const space = useAppSelector((state) => state.space.space.space);
  const post = useAppSelector((state) => state.space.post);
  const user = useAppSelector((state) => state.auth.user);

  const isAuthor = user.userName === space.author.userName;

  useEffect(() => {
    if (spaceId && postId) {
      dispatch(getSpaceAction({spaceId: spaceId}));
      dispatch(getPostAction({spaceId: spaceId, postId: postId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [spaceId, postId]);

  const handleEdit = (e:any) => {
    e.preventDefault();
    navigate(`/space/${spaceId}/post/${postId}/edit`);
  }

  const ButtonUI = (
    <div className='btn-container'>
      <Button color='primary'
        onClick={handleEdit}
      >
        edit
      </Button>
    </div>
  );

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='name-container'>
          <a href={`/space/${spaceId}`}>
            <div className='back-icon'><IconBackLeft /></div>
          </a>
          <span>{space.name}</span>
        </div>
      </div>
      {
        getPostStatus === 'pending' && (
          <div className='spinner-box'>
            <Spinner />
          </div>
        )
      }
      {
        getPostStatus === 'success' && (
          <React.Fragment>
            <div className='post-title'>
              {post.title}
            </div>
            <div className='post-description'>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {post.description}
            </div>
            {
              isAuthor && (
                ButtonUI
              )
            }
          </React.Fragment>
        )
      }
    </div>
  );
}

export default Post;