import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import cn from 'classnames';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { useAppSelector } from '../../store/hooks';
import ImageUpload from "../../components/ImageUpload";
import Spinner from "../../components/Spinner";
import imgError from '../../assets/image/demo.jpg';
import './style.scss';

interface ISpaceEditProps {
  buttonTxt: string,
  imgUrl?: string,
  imgFile: File | undefined,
  setImgFile: (img: File) => void,
  name: string,
  setName: (name: string) => void,
  description: string,
  setDescription: (description: string) => void,
  prerequisites: string[],
  setPrerequisites: (prerequisites: string[]) => void,
  keywords: string[],
  setKeywords: (keywords: string[]) => void,
  handleClick: () => void,
  disabled: boolean,
  buttonDisabled?: boolean,
  status: string,
  error: string,
}

function SpaceEdit({
  buttonTxt,
  imgUrl,
  imgFile,
  setImgFile,
  name,
  setName,
  description,
  setDescription,
  prerequisites,
  setPrerequisites,
  keywords,
  setKeywords,
  handleClick,
  disabled,
  buttonDisabled,
  status,
  error,
} : ISpaceEditProps) {
  const navigate = useNavigate();

  const [posted, setPosted] = useState<boolean>(false);

  const authenticated = useAppSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (!authenticated) {
      navigate('/');
    }
  // eslint-disable-next-line
  }, [authenticated]);

  const validPost = () => {
    return name !== '';
  }

  const handlePreChange = (prerequisites:string[]) => {
    setPrerequisites(prerequisites);
  }

  const handleKeywordsChange = (keywords:string[]) => {
    setKeywords(keywords);
  }

  const handleClickHelper = (e:any) => {
    e.preventDefault();
    setPosted(true);
    handleClick();
  }

  return (
    <div className='space-edit'>
      <div className='btn-container top'>
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
        <Button color='primary'
          disabled={disabled || !validPost() || buttonDisabled}
          onClick={handleClickHelper}
        >
          {
            status === 'pending' ? (
              <Spinner />
            ) : buttonTxt
          }
        </Button>
      </div>
      <div className='basic-info'>
        <div className='title'>
          <h3>basic info</h3>
        </div>
        <div className='space-image'>
          <div className='image-description'>
            <h3>add space image</h3>
            <div className='description-content'>
              <p>Show the community what the space are about.</p>
              <strong>Requirements:</strong>
              <ul><li>PNG or JPG format.</li><li>Maximum size: 2MB.</li></ul>
            </div>
          </div>
          <div className='image-upload'>
            <ImageUpload imgError={imgError}
              allowedTypes={['image/png', 'image/jpg', 'image/jpeg']}
              maxSize={2*1024*1024}
              imgUrl={imgUrl ? imgUrl : ''}
              imgFile={imgFile}
              setImgFile={setImgFile}
              disabled={disabled}
            />
          </div>
        </div>
        <div className='edit-card personal-details'>
          <div className='card-title'>
            <span>SPACE Description</span>
          </div>
          <div className='card-body'>
            <div className='description'>
              <p>Complete Space Description.</p>
            </div>
            <div className={cn('inputs', { disabled: disabled })}>
              <div className='input-row'>
                <div className='title'>
                  <label htmlFor='name'>name</label>
                </div>
                <input
                  className='text-box'
                  type='text'
                  value={name}
                  disabled={disabled}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </div>
              <div className='input-row'>
                <div className='title'>
                  <label htmlFor='name'>description</label>
                  <span>{description.length} / 300</span>
                </div>
                <textarea
                  className='text-area'
                  value={description}
                  disabled={disabled}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setDescription(e.target.value)
                    }
                  }}
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='edit-card prerequisites'>
          <div className='card-title'>
            <span>prerequisites</span>
          </div>
          <div className='card-body'>
            <div className='description'>
              <p>Add prerequisites to space.</p>
            </div>
            <div className={cn('inputs', { disabled: disabled})}>
              <TagsInput value={prerequisites} onChange={handlePreChange} disabled={disabled} />
            </div>
          </div>
        </div>
        <div className='edit-card keywords'>
          <div className='card-title'>
            <span>keywords</span>
          </div>
          <div className='card-body'>
            <div className='description'>
              <p>Add keywords to space.</p>
            </div>
            <div className={cn('inputs', { disabled: disabled })}>
              <TagsInput value={keywords} onChange={handleKeywordsChange} disabled={disabled} />
            </div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <Button color='primary'
          disabled={disabled || !validPost() || buttonDisabled}
          onClick={handleClickHelper}
        >
          {
            status === 'pending' ? (
              <Spinner />
            ) : buttonTxt
          }
        </Button>
      </div>
    </div>
  );
}

export default SpaceEdit;