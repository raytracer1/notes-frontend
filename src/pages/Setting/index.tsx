import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
import 'react-tagsinput/react-tagsinput.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateUserAction, clearUpdateErrAction, refreshUserAction,
} from '../../store/reducers/auth.reducer';
import ImageUpload from "../../components/ImageUpload";
import imgError from '../../assets/image/error.png';
import { Gender, Country } from '../../interface';
import { GENDER_OPTIONS, COUNTRY_OPTIONS } from "../../config";
import './style.scss';

function Setting() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const user = useAppSelector((state) => state.auth.user);
  const updateStatus = useAppSelector((state) => state.auth.update);
  const updateErr = useAppSelector((state) => state.auth.updateErr);

  const [gender, setGender] = useState<string>(user.gender ? user.gender : 'secret');
  const [country, setCountry] = useState<string>(user.country ? user.country : 'secret');
  const [imgFile, setImgFile] = useState<File>();
  const [interests, setInterests] = useState<string[]>(user.interests ? user.interests : []);
  const [interestChanged, setInterestsChanged] = useState<boolean>(false);

  useEffect(() => {
    dispatch(refreshUserAction());
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!authenticated) {
      navigate('/');
    }
  // eslint-disable-next-line
  }, [authenticated]);

  const handleUpdate = (
    gender: string, country: string, interests: string[], imgFile?: File,
  ) => {
    dispatch(updateUserAction({gender, country, interests, imgFile}));
    setInterestsChanged(false);
    setImgFile(undefined);
  }

  const clearUpdateErr = () => {
    dispatch(clearUpdateErrAction());
  }

  const uploadGender = () => {
    return gender === 'secret' ? '' : gender;
  }

  const uploadCountry = () => {
    return country === 'secret' ? '' : country;
  }

  const settingChanged = () => {
    return (user.gender !== uploadGender()) ||
      (user.country !== uploadCountry()) ||
      imgFile || interestChanged;
  }

  const handleInterestsChange = (interests:string[]) => {
    setInterests(interests);
    setInterestsChanged(true);
  }

  const handleClick = (e:any) => {
    handleUpdate(uploadGender(), uploadCountry(), interests, imgFile);
    e.preventDefault();
  }

  return (
    <div className='setting'>
      <div className='btn-container top'>
        {
          updateStatus === 'success' && (
            <div className='msg'>
              <span className="success">success</span>
            </div>
          )
        }
        {
          updateStatus === 'failed' && (
            updateErr !== '' ? (
              <div className='msg'>
                <span className="error">
                  {updateErr}
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
        <Button type='submit' value='submit' color='primary'
          disabled={updateStatus === 'pending' || !settingChanged()}
          onClick={handleClick}
        >
          {
            updateStatus === 'pending' ? (
              <div className='spinner'></div>
            ) : "save changes"
          }
        </Button>
      </div>
      <div className='basic-info'>
        <div className='title'>
          <h3>basic info</h3>
        </div>
        <div className='user-image'>
          <div className='image-description'>
            <h3>add your image</h3>
            <div className='description-content'>
              <p>Show the community who you are. Don't worry, you look great.</p>
              <strong>Requirements:</strong>
              <ul><li>PNG or JPG format.</li><li>Maximum size: 2MB.</li></ul>
            </div>
          </div>
          <div className='image-upload'>
            <ImageUpload imgError={imgError}
              allowedTypes={['image/png', 'image/jpg', 'image/jpeg']}
              maxSize={2*1024*1024}
              imgUrl={user.imageUrl}
              imgFile={imgFile}
              setImgFile={setImgFile}
              disabled={updateStatus === 'pending'}
            />
          </div>
        </div>
        <div className='setting-card personal-details'>
          <div className='card-title'>
            <span>PERSONAL DETAILS</span>
          </div>
          <div className='card-body'>
            <div className='description'>
              <p>Sharing your details.</p>
            </div>
            <div className={updateStatus === 'pending' ? 'inputs disabled' : 'inputs'}>
              <div className='input-row'>
                <label htmlFor='gender'>gender</label>
                <Select
                  className='select'
                  classNamePrefix='select'
                  options={GENDER_OPTIONS}
                  value={{value: gender}}
                  onChange={(e) => {
                    if (e?.value) {
                      setGender(e?.value);
                    }
                    clearUpdateErr();
                  }}
                  getOptionLabel={(gender: Gender) => gender.value}
                  getOptionValue={(gender: Gender) => gender.value}
                />
              </div>
              <div className='input-row'>
                <label htmlFor='country'>country</label>
                <Select
                  className='select'
                  classNamePrefix='select'
                  options={COUNTRY_OPTIONS}
                  value={{value: country}}
                  onChange={(e) => {
                    if (e?.value) {
                      setCountry(e?.value);
                    }
                    clearUpdateErr();
                  }}
                  getOptionLabel={(country: Country) => country.value}
                  getOptionValue={(country: Country) => country.value}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='setting-card interests'>
          <div className='card-title'>
            <span>interests</span>
          </div>
          <div className='card-body'>
            <div className='description'>
              <p>Add interests to your setting. You can add or update your interests any time.</p>
            </div>
            <div className={updateStatus === 'pending' ? 'inputs disabled' : 'inputs'}>
              <TagsInput value={interests} onChange={handleInterestsChange} disabled={updateStatus === 'pending'} />
            </div>
          </div>
        </div>
      </div>
      <div className='btn-container'>
        <Button type='submit' value='submit' color='primary'
          disabled={updateStatus === 'pending' || !settingChanged()}
          onClick={handleClick}
        >
          {
            updateStatus === 'pending' ? (
              <div className='spinner'></div>
            ) : "save changes"
          }
        </Button>
      </div>
    </div>
  );
}
  
export default Setting;