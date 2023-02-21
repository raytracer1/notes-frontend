import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ModalWrapper from '../../ModalWrapper';

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

  return (
    <ModalWrapper
      isModalOpen={isModalOpen}
      toggleModal={toggleModal}
      title="login"
    >
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="text" id="email" name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="text" id="password" name="password"
            value={passWord}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" name="remember"
            checked={remember}
            onChange={(e) => {
              setRemember(e.target.checked)
            }}
          />
          Remember me
        </FormGroup>
        <Button type="submit" value="submit" color="primary"
          disabled={(email === '') || (passWord === '')}
        >
          Login
        </Button>
      </Form>
    </ModalWrapper>
  );
}
  
export default LoginModal;