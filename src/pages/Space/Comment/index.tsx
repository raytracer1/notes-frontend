import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getCommentsAction, createCommentAction
} from '../../../store/reducers/space.reducer';
import Spinner from "../../../components/Spinner";
import { Button } from 'reactstrap';
import { formatDate } from '../../../util/dateHelper';
import './style.scss';

interface ICommentProps {
  spaceId: string,
  authStatus: boolean,
}

function Comment({
  spaceId,
  authStatus
} : ICommentProps) {

  const dispatch = useAppDispatch();

  const getCommentsStatus = useAppSelector((state) => state.space.getComments);
  const comments = useAppSelector((state) => state.space.comments);
  const createCommentStatus = useAppSelector((state) => state.space.createComment);

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    dispatch(getCommentsAction({spaceId: spaceId}));
    // eslint-disable-next-line
  }, [spaceId]);

  const handleCreate = (e:any) => {
    e.preventDefault();
    dispatch(createCommentAction({spaceId: spaceId, content: content}));
    setContent('');
  }

  return (
    <div className='comment-container'>
      <div className='comment'>
        {
          getCommentsStatus === 'pending' && (
            <div className='spinner-box'>
              <Spinner />
            </div>
          )
        }
        {
          getCommentsStatus === 'success' && comments.commentsList.length > 0 && (
            comments.commentsList.map((item, index) => (
              <div key={index} className='comment-item'>
                <div className='image-box'>
                  <a href={`/profile/${item.author.userName}`}>
                    <img src={item.author.imageUrl} alt='user'/>
                  </a>
                </div>
                <div className='content-box'>
                  <div className='author'>
                    <a href={`/profile/${item.author.userName}`}>
                      {item.author.userName}
                    </a>
                  </div>
                  <div className='content'>{item.content}</div>
                  <div className='date'>{formatDate(item.createdAt)}</div>
                </div>
              </div>
            ))
          )
        }
      </div>
      <div className='create-comment'>
        <textarea
          className='text-area'
          value={content}
          disabled={createCommentStatus === 'pending' || !authStatus}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          rows={5}
        />
        <Button color='primary'
          onClick={handleCreate}
          disabled={createCommentStatus === 'pending' || !authStatus || content === ''}
        >
          comment
        </Button>
      </div>
    </div>
  );
}

export default Comment;