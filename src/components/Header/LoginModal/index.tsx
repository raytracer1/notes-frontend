import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../ModalWrapper';
import { validUserName, validPassWord } from '../../../util/validate';

interface ILoginModalProps {
  userName: string,
  setUserName: (userName: string) => void,
  passWord: string,
  setPassWord: (passWord: string) => void,
  remember: boolean,
  setRemember: (remember: boolean) => void,
  isModalOpen: boolean,
  toggleModal: () => void,
  handleLogin: (event: any) => void,
}

const LoginModal = ({
  userName,
  setUserName,
  passWord,
  setPassWord,
  remember,
  setRemember,
  isModalOpen,
  toggleModal,
  handleLogin,
} : ILoginModalProps) => {

  const [focus, setFocus] = useState<string>('');
  const toggleLoginModalHeler = () => {
    setUserName('');
    setPassWord('');
    setFocus('');
    toggleModal();
  }

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleLoginModalHeler}
      title='login'
    >
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Input type='text' id='username' name='username'
            placeholder='username'
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
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
        <FormGroup check>
          <Input type='checkbox' name='remember'
            checked={remember}
            onChange={(e) => {
              setRemember(e.target.checked)
            }}
          />
          Remember me
        </FormGroup>
        <Button type='submit' value='submit' color='primary'
          disabled={!validUserName(userName) || !validPassWord(passWord)}
        >
          Login
        </Button>
      </Form>
    </ModalWrapper>
  );
}
  
export default LoginModal;