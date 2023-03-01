import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../../components/Modal';
import './style.scss';

interface IProfileModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  handleUpdate: (
    gender?: string,
    country?: string,
    imageUrl?: string,
  ) => void,
  updateStatus: string,
  updateErr: string,
  clearUpdateErr: () => void;
  user : {
    email: string,
    userName: string,
    gender: string,
    country: string,
    imageUrl: string,
  },
}

const ProfileModal = ({
  isModalOpen,
  toggleModal,
  handleUpdate,
  updateStatus,
  updateErr,
  clearUpdateErr,
  user,
} : IProfileModalProps) => {

  const [gender, setGender] = useState<string>(user.gender ? user.gender : '');
  const [country, setCountry] = useState<string>(user.country ? user.country : '');
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl ? user.imageUrl : '');

  const toggleProfileModalHeler = () => {
    setGender(user.gender ? user.gender : '');
    setCountry(user.country ? user.country : '');
    toggleModal();
    clearUpdateErr();
  }

  const profileChanged = () => {
    return (gender !== '' && user.gender !== gender) ||
      (country !== '' && user.country !== country) ||
      (imageUrl !== '' && user.imageUrl !== imageUrl);
  }

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleProfileModalHeler}
      title='profile'
    >
      <div className='user-image'>
        <img src={user.imageUrl} alt='user icon' />
      </div>
      <Form onSubmit={(event:any) => {
          handleUpdate(gender, country, imageUrl);
          event.preventDefault();
        }
      }>
        <FormGroup>
          <Input type='text' id='gender' name='gender'
            placeholder='gender'
            disabled={updateStatus === 'pending'}
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              clearUpdateErr();
            }}
          />
        </FormGroup>
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
    </ModalWrapper>
  );
}
  
export default ProfileModal;