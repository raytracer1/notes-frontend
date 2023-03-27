import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getPostAction, getCommentsAction, createCommentAction
} from '../../store/reducers/space.reducer';
import { ReactComponent as IconBackLeft }  from '../../assets/svg/back-left.svg';
import Spinner from "../../components/Spinner";
import { formatDate } from '../../util/dateHelper';
import './style.scss';


function Post() {
  const { postId } = useParams();
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

  const [content, setContent] = useState<string>('');

  const isAuthor = user.userName === space.author.userName;

  useEffect(() => {
    if (postId) {
      dispatch(getPostAction({postId: postId}));
      dispatch(getCommentsAction({postId: postId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [postId]);

  const handleEdit = (e:any) => {
    e.preventDefault();
    navigate(`/post/${postId}/edit`);
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
        export
      </Button>
    </div>
  );

  const handleCreate = (e:any) => {
    e.preventDefault();
    if (postId) {
      dispatch(createCommentAction({postId: postId, content: content}));
    }
    setContent('');
  }

  return (
    <div className='post'>
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
            <div className='post-header'>
              <div className='name-container'>
                <a href={`/space/${space._id}`}>
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
                  preview='edit'
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
          </React.Fragment>
        )
      }
    </div>
  );
}

export default Post;