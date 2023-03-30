import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getPostAction, getCommentsAction, createCommentAction,
  createPostVoteAction, createCommentVoteAction
} from '../../store/reducers/space.reducer';
import { ReactComponent as IconBackLeft }  from '../../assets/svg/back-left.svg';
import { ReactComponent as IconHand }  from '../../assets/svg/hand.svg';
import Spinner from '../../components/Spinner';
import { formatDate } from '../../util/dateHelper';
import { singleComment } from '../../interface';
import Annotation from '../../containers/Annotation';
import './style.scss';


function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getPostStatus = useAppSelector((state) => state.space.getPost);
  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const space = useAppSelector((state) => state.space.space.space);
  const post = useAppSelector((state) => state.space.post.post);
  const postVote = useAppSelector((state) => state.space.post.voteList);
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

  const handlePostVote = (vote: string) => {
    if (postId && authStatus) {
      const alreadyVote = !!postVote.find((item) => item.author.userName === user.userName);
      if (!alreadyVote) {
        dispatch(createPostVoteAction({postId: postId, vote: vote}));
      }
    }
  }

  const handleCommentVote = (item: singleComment, vote: string) => {
    if (postId && authStatus) {
      const alreadyVote = !!item.voteList.find((item) => item.author.userName === user.userName);
      if (!alreadyVote) {
        dispatch(createCommentVoteAction({postId: postId, commentId: item.comment._id, vote: vote}));
      }
    }
  }

  return (
    <div className='post-container'>
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
              <div className='post-content-container'>
                <div className='votes'>
                  <div className='vote-container'>
                    <div className='up' onClick={(e: any) => {
                      e.preventDefault();
                      handlePostVote('up')}
                    }>
                      <IconHand />
                    </div>
                    <span>{postVote.filter((item) => item.vote === 'up').length}</span>
                  </div>
                  <div className='vote-container'>
                    <div className='down' onClick={(e: any) => {
                      e.preventDefault();
                      handlePostVote('down')}
                    }>
                      <IconHand />
                    </div>
                    <span>{postVote.filter((item) => item.vote === 'down').length}</span>
                  </div>
                </div>
                <div className='post-annotation'>
                  <Annotation>
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
                  </Annotation>
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
                            <a href={`/profile/${item.comment.author.userName}`}>
                              <img src={item.comment.author.imageUrl} alt='user'/>
                            </a>
                          </div>
                          <div className='content-box'>
                            <div className='author'>
                              <a href={`/profile/${item.comment.author.userName}`}>
                                {item.comment.author.userName}
                              </a>
                              <div className='votes'>
                                <div className='vote-container'>
                                  <div className='up' onClick={(e:any) => {
                                    e.preventDefault();
                                    handleCommentVote(item, 'up');
                                  }}>
                                    <IconHand />
                                  </div>
                                  <span>{item.voteList.filter((item) => item.vote === 'up').length}</span>
                                </div>
                                <div className='vote-container'>
                                  <div className='down' onClick={(e:any) => {
                                    e.preventDefault();
                                    handleCommentVote(item, 'down');
                                  }}>
                                    <IconHand />
                                  </div>
                                  <span>{item.voteList.filter((item) => item.vote === 'down').length}</span>
                                </div>
                              </div>
                            </div>
                            <div className='content'>
                            <MarkdownPreview
                              source={item.comment.content}
                            />
                            </div>
                            <div className='date'>{formatDate(item.comment.createdAt)}</div>
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
    </div>
  );
}

export default Post;