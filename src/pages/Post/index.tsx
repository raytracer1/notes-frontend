import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
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
    </div>
  );
}

export default Post;