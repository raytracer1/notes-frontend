import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSpaceAction, getPostAction, getCommentsAction, createCommentAction
} from '../../store/reducers/space.reducer';
import { ReactComponent as IconBackLeft }  from '../../assets/svg/back-left.svg';
import Spinner from "../../components/Spinner";
import { formatDate } from '../../util/dateHelper';
import './style.scss';


function Post() {
  const { spaceId, postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPostStatus = useAppSelector((state) => state.space.getPost);
  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const space = useAppSelector((state) => state.space.space.space);
  const post = useAppSelector((state) => state.space.post);
  const user = useAppSelector((state) => state.auth.user);

  const getCommentsStatus = useAppSelector((state) => state.space.getComments);
  const comments = useAppSelector((state) => state.space.comments);
  const createCommentStatus = useAppSelector((state) => state.space.createComment);

  const isAuthor = user.userName === space.author.userName;

  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (spaceId && postId) {
      dispatch(getCommentsAction({spaceId: spaceId, postId: postId}));
    }
    // eslint-disable-next-line
  }, [spaceId]);

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

  const handleSave = (e:any) => {
    e.preventDefault();
    const input = document.getElementsByClassName('text-area')[0] as HTMLElement;
    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 4, 4, 0, 0);
          pdf.save(`${space.name}-${post.title}.pdf`);
        })
      ;
    }
  }

  const editButtonUI = (
    <div className='btn-container'>
      <Button color='primary'
        onClick={handleEdit}
      >
        edit
      </Button>
    </div>
  );

  const saveButtonUI = (
    <div className='btn-container'>
      <Button color='primary'
        onClick={handleSave}
      >
        save
      </Button>
    </div>
  );

  const handleCreate = (e:any) => {
    e.preventDefault();
    if (spaceId && postId) {
      dispatch(createCommentAction({spaceId: spaceId, postId: postId, content: content}));
    }
    setContent('');
  }

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='name-container'>
          <a href={`/space/${spaceId}`}>
            <div className='back-icon'><IconBackLeft /></div>
          </a>
          <span>{space.name}</span>
        </div>
        {
          isAuthor ? (
            editButtonUI
          ) : (
            saveButtonUI
          )
        }
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
            <div className='post-content'>
              <div className='post-title'>
                {post.title}
              </div>
              <div className='post-description'>
                <MarkdownPreview
                source={post.description}
                className='text-area'
                />
              </div>
            </div>
        )
      }
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
                    <div className='content'>
                    <MarkdownPreview
                      source={item.content}
                    />
                    </div>
                    <div className='date'>{formatDate(item.createdAt)}</div>
                  </div>
                </div>
              ))
            )
          }
        </div>
        <div className='create-comment'>
          <MDEditor
            className='text-area'
            value={content}
            onChange={(e) => {
              if (e !== undefined) {
                setContent(e)
              }
            }}
          />
          <div className='button-container'>
            <Button color='primary'
              onClick={handleCreate}
              disabled={createCommentStatus === 'pending' || !authStatus || content === ''}
            >
              comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;