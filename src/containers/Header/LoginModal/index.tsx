import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../../components/Modal';
import { validUserName, validPassWord } from '../../../util/validate';

interface ILoginModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  handleLogin: (userName: string, passWord: string) => void,
  loginStatus: string,
}

const LoginModal = ({
  isModalOpen,
  toggleModal,
  handleLogin,
  loginStatus,
} : ILoginModalProps) => {

  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [focus, setFocus] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  const toggleLoginModalHeler = () => {
    setUserName('');
    setPassWord('');
    setRemember(false);
    setFocus('');
    toggleModal();
  }

  useEffect(() => {
    if (loginStatus === 'success') {
      toggleLoginModalHeler();
    } else if (loginStatus === 'failed') {
      setLoginError('username or password error');
    }
  }, [loginStatus, toggleLoginModalHeler]);

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleLoginModalHeler}
      title='login'
    >
      <Form onSubmit={(event:any) => {
          handleLogin(userName, passWord);
          event.preventDefault();
        }
      }>
        <FormGroup>
          <Input type='text' id='username' name='username'
            placeholder='username'
            disabled={loginStatus === 'pending'}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setLoginError('');
            }}
            onFocus={() => {
              setFocus('username');
            }}
            onBlur={() => {
              setFocus('');
            }}
          />
          {
            !validUserName(userName) &&
            focus !== 'username' && userName.length > 0 && (
              <span className='error'>
                {'username should start with character and length between 6 and 20'}
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
              setLoginError('');
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
        <FormGroup check>
          <Input type='checkbox' name='remember'
            disabled={loginStatus === 'pending'}
            checked={remember}
            onChange={(e) => {
              setRemember(e.target.checked)
            }}
          />
          Remember me
        </FormGroup>
        {
          loginError !== '' && (
            <div className='login-error'>
              <span className="error">
                {loginError}
              </span>
            </div>
          )
        }
        <Button type='submit' value='submit' color='primary'
          disabled={!validUserName(userName)
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