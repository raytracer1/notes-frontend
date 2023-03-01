import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../../components/Modal';
import './style.scss';

interface IProfileModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  handleUpdate: (
    firstName?: string,
    lastName?: string,
    country?: string,
    imageUrl?: string,
  ) => void,
  updateStatus: string,
  updateErr: string,
  clearUpdateErr: () => void;
  user : {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
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

  const [firstName, setFirstName] = useState<string>(user.firstName ? user.firstName : '');
  const [lastName, setLastName] = useState<string>(user.lastName ? user.lastName : '');
  const [country, setCountry] = useState<string>(user.country ? user.country : '');
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl ? user.imageUrl : '');

  const toggleProfileModalHeler = () => {
    setFirstName(user.firstName ? user.firstName : '');
    setLastName(user.lastName ? user.lastName : '');
    setCountry(user.country ? user.country : '');
    toggleModal();
    clearUpdateErr();
  }

  const profileChanged = () => {
    return (firstName !== '' && user.firstName !== firstName) ||
      (lastName !== '' && user.lastName !== lastName) ||
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
        <img src={user.imageUrl} alt='user image' />
      </div>
      <Form onSubmit={(event:any) => {
          handleUpdate(firstName, lastName, country, imageUrl);
          event.preventDefault();
        }
      }>
        <FormGroup>
          <Input type='text' id='firstName' name='firstName'
            placeholder='First Name'
            disabled={updateStatus === 'pending'}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearUpdateErr();
            }}
          />
        </FormGroup>
        <FormGroup>
          <Input type='text' id='lastName' name='lastName'
            placeholder='Last Name'
            disabled={updateStatus === 'pending'}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
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