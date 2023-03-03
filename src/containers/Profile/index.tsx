import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateUserAction, clearUpdateErrAction,
} from '../../store/reducers/auth.reducer';
import './style.scss';

function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const updateStatus = useAppSelector((state) => state.auth.update);
  const updateErr = useAppSelector((state) => state.auth.updateErr);
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<string>(user.gender ? user.gender : 'secret');
  const [country, setCountry] = useState<string>(user.country ? user.country : 'secret');
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl ? user.imageUrl : '');

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

  const toggleProfileModalHeler = () => {
    setGender(user.gender ? user.gender : 'secret');
    setCountry(user.country ? user.country : 'secret');
    clearUpdateErr();
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
    <div>
      <div className='user-image'>
        <img src={user.imageUrl} alt='user icon'
          onError={(e) => {
            if (e.target) {
              (e.target as HTMLImageElement).src = 'image/error.png'
            }
            e.preventDefault();
          }}
        />
      </div>
      <div className='user-info'>
        <Form onSubmit={(event:any) => {
            handleUpdate(uploadGender(), uploadCountry(), imageUrl);
            event.preventDefault();
          }
        }>
          <FormGroup>
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
          <FormGroup>
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
          <div className='interests'>
            <div className='label'>interests</div>
            <div className='add'>add interests</div>
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
          <Button type='submit' value='submit' color='primary'
            disabled={updateStatus === 'pending' || !profileChanged()}
          >
            {
              updateStatus === 'pending' ? (
                <div className='spinner'></div>
              ) : "save changes"
            }
          </Button>
        </Form>
      </div>
    </div>
  );
}
  
export default Profile;