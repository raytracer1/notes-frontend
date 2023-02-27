import { useState } from "react";
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ModalWrapper from '../../../components/ModalWrapper';
import { validUserName, validEmail, validPassWord } from '../../../util/validate';

interface ISignUpModalProps {
  isModalOpen: boolean,
  toggleModal: () => void,
  handleSignUp: (event: any) => void,
}

const SignUpModal = ({
  isModalOpen,
  toggleModal,
  handleSignUp,
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
  }

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleLoginModalHeler}
      title='Sign Up'
    >
      <Form onSubmit={handleSignUp}>
        <FormGroup>
          <Input type='text' id='username' name='username'
            placeholder='username'
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
        <Button type='submit' value='submit' color='primary'
          disabled={!validUserName(userName) || !validEmail(email) || !validPassWord(passWord)}
        >
          Sign Up
        </Button>
      </Form>
    </ModalWrapper>
  );
}
  
export default SignUpModal;