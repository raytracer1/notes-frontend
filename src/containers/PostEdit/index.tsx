
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSpaceAction
} from '../../store/reducers/space.reducer';
import { ReactComponent as IconBackLeft }  from '../../assets/svg/back-left.svg';
import './style.scss';

interface IPostEditProps {
  buttonTxt: string,
  backUrl: string,
  title: string,
  setTitle: (title: string) => void,
  description: string,
  setDescription: (description: string) => void,
  handleClick: () => void,
  disabled: boolean,
  buttonDisabled?: boolean,
  status: string,
  error: string,
}

function PostEdit({
  buttonTxt,
  backUrl,
  title,
  setTitle,
  description,
  setDescription,
  handleClick,
  disabled,
  buttonDisabled,
  status,
  error,
} : IPostEditProps) {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const user = useAppSelector((state) => state.auth.user);
  const getSpaceStatus = useAppSelector((state) => state.space.getSpace);
  const space = useAppSelector((state) => state.space.space.space);

  const [posted, setPosted] = useState<boolean>(false);

  useEffect(() => {
    if (spaceId && authStatus) {
      dispatch(getSpaceAction({spaceId: spaceId}));
    } else {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [spaceId]);

  useEffect(() => {
    if (getSpaceStatus === 'success') {
      if (space.author.userName !== user.userName) {
        navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [getSpaceStatus, space]);

  const handleClickHelper = (e:any) => {
    e.preventDefault();
    setPosted(true);
    handleClick();
  }

  const validPost = () => {
    return title !== '';
  }

  const ButtonUI = (
    <Button color='primary'
      onClick={handleClickHelper}
      disabled={disabled || !validPost() || buttonDisabled}
    >
      {buttonTxt}
    </Button>
  );

  return (
    <div className='post-edit'>
      <div className='post-header'>
        <div className='name-container'>
          <a href={`${backUrl}`}>
            <div className='back-icon'><IconBackLeft /></div>
          </a>
          <span>{space.name}</span>
        </div>
        {
          posted === true && status === 'success' && (
            <div className='msg'>
              <span className="success">success</span>
            </div>
          )
        }
        {
          posted === true && status === 'failed' && (
            error !== '' ? (
              <div className='msg'>
                <span className="error">
                  {error}
                </span>
              </div>
            ) : (
              <div className='msg'>
                <span className="error">
                  unknown error
                </span>
              </div>
            )
          )
        }
        <div className='btn-container'>
          {ButtonUI}
        </div>
      </div>
      <div className={cn('inputs', { disabled: disabled })}>
        <div className='input-row'>
          <div className='title'>
            <label htmlFor='name'>title</label>
          </div>
          <input
            className='text-box'
            type='text'
            value={title}
            disabled={disabled}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className='input-row md'>
          <div className='title'>
            <label htmlFor='name'>description</label>
            <span>{description.length} /
              <span className='infinite'>∞</span>
            </span>
          </div>
          <MDEditor
            className='text-area'
            value={description}
            onChange={(e) => {
              if (e !== undefined) {
                setDescription(e)
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostEdit;