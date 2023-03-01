import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../../components/Modal';
import { validUserName, validEmail, validPassWord } from '../../../util/validate';

interface ISignUpModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  handleSignUp: (userName: string, email: string, passWord: string) => void,
  signupStatus: string,
  signupErr: string,
  clearSignupErr: () => void,
}

const SignUpModal = ({
  isModalOpen,
  toggleModal,
  handleSignUp,
  signupStatus,
  signupErr,
  clearSignupErr,
} : ISignUpModalProps) => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');

  const [focus, setFocus] = useState<string>('');
  const toggleLoginModalHeler = () => {
    setUserName('');
    setEmail('');
    setPassWord('');
    setFocus('');
    toggleModal();
    clearSignupErr();
  }

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleLoginModalHeler}
      title='Sign Up'
    >
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSignUp(userName, email, passWord);
      }}>
        <FormGroup>
          <Input type='text' id='email' name='email'
            placeholder='email'
            disabled={signupStatus === 'pending'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={() => {
              setFocus('email');
            }}
            onBlur={() => {
              setFocus('');
            }}
          />
          {
            !validEmail(email) &&
            focus !== 'email' && email.length > 0 && (
              <span className='error'>
                {'email should like xxx@yyy.com'}
              </span>
            )
          }
        </FormGroup>
        <FormGroup>
          <Input type='text' id='username' name='username'
            placeholder='username'
            disabled={signupStatus === 'pending'}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            onFocus={() => {
              setFocus('userName');
            }}
            onBlur={() => {
              setFocus('');
            }}
          />
          {
            !validUserName(userName) &&
            focus !== 'userName' && userName.length > 0 && (
              <span className='error'>
                {'username should start with character and length between 6 and 20'}
              </span>
            )
          }
        </FormGroup>
        <FormGroup>
          <Input type='password' id='password' name='password'
            placeholder='password'
            disabled={signupStatus === 'pending'}
            value={passWord}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
            onFocus={() => {
              setFocus('password');
            }}
            onBlur={() => {
              setFocus('');
            }}
          />
          {
            !validPassWord(passWord) &&
            focus !== 'password' && passWord.length > 0 && (
              <span className='error'>
                {'Password length < 6'}
              </span>
            )
          }
        </FormGroup>
        {
          signupStatus === 'success' && (
            <div className="msg">
              <span className="success">success</span>
            </div>
          )
        }
        {
          signupStatus === 'failed' && (
            signupErr !== '' ? (
              <div className="msg">
                <span className="error">{signupErr}</span>
              </div>
            ) : (
              <div className="msg">
                <span className="error">unknown error</span>
              </div>
            )
          )
        }
        <Button type='submit' value='submit' color='primary'
          disabled={!validUserName(userName) || !validEmail(email) ||
            !validPassWord(passWord) || signupStatus === 'pending'}
        >
          {
            signupStatus === 'pending' ? (
              <div className='spinner'></div>
            ) : "sign up"
          }
        </Button>
      </Form>
    </ModalWrapper>
  );
}
  
export default SignUpModal;