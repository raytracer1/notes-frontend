import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../../components/Modal';
import { validEmail, validPassWord } from '../../../util/validate';

interface ILoginModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  handleLogin: (email: string, passWord: string) => void,
  loginStatus: string,
  loginErr: string,
  clearLoginErr: () => void;
}

const LoginModal = ({
  isModalOpen,
  toggleModal,
  handleLogin,
  loginStatus,
  loginErr,
  clearLoginErr,
} : ILoginModalProps) => {

  const [email, setEmail] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [focus, setFocus] = useState<string>('');

  const toggleLoginModalHeler = () => {
    setEmail('');
    setPassWord('');
    setFocus('');
    toggleModal();
    clearLoginErr();
  }

  useEffect(() => {
    if (loginStatus === 'success') {
      toggleLoginModalHeler();
    }
  // eslint-disable-next-line
  }, [loginStatus]);

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleLoginModalHeler}
      title='login'
    >
      <Form onSubmit={(event:any) => {
          handleLogin(email, passWord);
          event.preventDefault();
        }
      }>
        <FormGroup>
          <Input type='text' id='email' name='email'
            placeholder='email'
            disabled={loginStatus === 'pending'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearLoginErr();
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
          <Input type='password' id='password' name='password'
            placeholder='password'
            disabled={loginStatus === 'pending'}
            value={passWord}
            onChange={(e) => {
              setPassWord(e.target.value);
              clearLoginErr();
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
          loginStatus === 'failed' && (
            loginErr !== '' ? (
              <div className='msg'>
                <span className="error">
                  {loginErr}
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
          disabled={!validEmail(email)
            || !validPassWord(passWord)
            || loginStatus === 'pending'
          }
        >
          {
            loginStatus === 'pending' ? (
              <div className='spinner'></div>
            ) : "login"
          }
        </Button>
      </Form>
    </ModalWrapper>
  );
}

export default LoginModal;