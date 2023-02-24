import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../ModalWrapper';
import { validEmail, validPassWord } from '../../../util/validate';

interface ILoginModalProps {
  email: string,
  setEmail: (userName: string) => void,
  passWord: string,
  setPassWord: (passWord: string) => void,
  remember: boolean,
  setRemember: (remember: boolean) => void,
  isModalOpen: boolean,
  toggleModal: () => void,
  handleLogin: (event: any) => void,
}

const LoginModal = ({
  email,
  setEmail,
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
    setEmail('');
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
          <Input type='text' id='email' name='email'
            placeholder='email'
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
          disabled={!validEmail(email) || !validPassWord(passWord)}
        >
          Login
        </Button>
      </Form>
    </ModalWrapper>
  );
}
  
export default LoginModal;