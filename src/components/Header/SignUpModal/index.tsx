import { useState } from "react";
import { Button, Modal, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.scss';

interface ISignUpModalProps {
  userName: string,
  setUserName: (userName: string) => void,
  email: string,
  setEmail: (userName: string) => void,
  passWord: string,
  setPassWord: (passWord: string) => void,
  isModalOpen: boolean,
  toggleModal: () => void,
  handleSignUp: (event: any) => void,
}

const SignUpModal = ({
  userName,
  setUserName,
  email,
  setEmail,
  passWord,
  setPassWord,
  isModalOpen,
  toggleModal,
  handleSignUp,
} : ISignUpModalProps) => {

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <div className="modal-header">
        <div className="modal-titel">Sign Up</div>
        <Button className="btn-close" onClick={toggleModal}>
          <span>x</span>
        </Button>
      </div>
      <ModalBody>
        <Form onSubmit={handleSignUp}>
        <FormGroup>
            <Label htmlFor="username">UserName</Label>
            <Input type="text" id="username" name="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </FormGroup>
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
          <Button type="submit" value="submit" color="primary"
            disabled={(userName === '') || (email === '') || (passWord === '')}
          >
            Sign Up
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}
  
export default SignUpModal;