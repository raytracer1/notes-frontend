import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateUserAction, clearUpdateErrAction,
} from '../../store/reducers/auth.reducer';
import './style.scss';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const user = useAppSelector((state) => state.auth.user);
  const updateStatus = useAppSelector((state) => state.auth.update);
  const updateErr = useAppSelector((state) => state.auth.updateErr);

  const [gender, setGender] = useState<string>(user.gender ? user.gender : 'secret');
  const [country, setCountry] = useState<string>(user.country ? user.country : 'secret');
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl ? user.imageUrl : '');

  useEffect(() => {
    if (!authenticated) {
      navigate('/');
    }
  }, [authenticated]);

  useEffect(() => {
    if (gender !== user.gender) {
      setGender(user.gender);
    }

    if (country !== user.country) {
      setCountry(user.country);
    }

    if (imageUrl !== user.imageUrl) {
      setImageUrl(user.imageUrl)
    }

  }, [user]);

  const handleUpdate = (
    gender: string, country: string, imageUrl: string
  ) => {
    dispatch(updateUserAction({gender, country, imageUrl}));
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

  const profileChanged = () => {
    return (user.gender !== uploadGender()) ||
      (user.country !== uploadCountry()) ||
      (imageUrl !== '' && user.imageUrl !== imageUrl);
  }

  return (
    <div className='profile'>
      <Form onSubmit={(e:any) => {
          handleUpdate(uploadGender(), uploadCountry(), imageUrl);
          e.preventDefault();
        }
      }>
        <div className='btn-container top'>
          <Button type='submit' value='submit' color='primary'
            disabled={updateStatus === 'pending' || !profileChanged()}
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
              <img src={user.imageUrl} alt='user icon'
                onError={(e) => {
                  if (e.target) {
                    (e.target as HTMLImageElement).src = 'image/error.png'
                  }
                  e.preventDefault();
                }}
              />
            </div>
          </div>
          <div className='profile-card personal-details'>
            <div className='card-title'>
              <span>PERSONAL DETAILS</span>
            </div>
            <div className='card-body'>
              <div className='description'>
                <p>By keeping this information up to date we may contact you about relevant freelance
                  opportunites at Topcoder, or even surprise you with a cool T-shirt. Sharing your contact
                  details will never result in robocalls about health insurance plans or junk mail.
                </p>
              </div>
              <div className='inputs'>
                <FormGroup className={updateStatus === 'pending' ? 'disabled' : ''}>
                  <label htmlFor='gender'>gender</label>
                  <Input type='select' id='gender' name='gender'
                    disabled={updateStatus === 'pending'}
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      clearUpdateErr();
                    }}
                  >
                    <option>secret</option>
                    <option>male</option>
                    <option>Female</option>
                  </Input>
                </FormGroup>
                <FormGroup className={updateStatus === 'pending' ? 'disabled' : ''}>
                  <label htmlFor='country'>country</label>
                  <Input type='select' id='country' name='country'
                    disabled={updateStatus === 'pending'}
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      clearUpdateErr();
                    }}
                  >
                    <option>secret</option>
                    <option>China</option>
                    <option>America</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className='profile-card interests'>
            <div className='card-title'>
              <span>interests</span>
            </div>
            <div className='card-body'>
              <div className='description'>
                <p>Add interests to your profile. You can add or update your interests any time.</p>
              </div>
              <div className='inputs'>
              </div>
            </div>
          </div>
        </div>
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
        <div className='btn-container'>
          <Button type='submit' value='submit' color='primary'
            disabled={updateStatus === 'pending' || !profileChanged()}
          >
            {
              updateStatus === 'pending' ? (
                <div className='spinner'></div>
              ) : "save changes"
            }
          </Button>
        </div>
      </Form>
    </div>
  );
}
  
export default Profile;