import { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
  Button, Modal, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handlelogin = (event:any) => {
    toggleModal();
    alert(" Username: " + userName + " Password: " + passWord
        + " Remember: " + remember);
    event.preventDefault();
    setUserName('');
    setPassWord('');
    setRemember(false);
}

  return (
    <div className='header'>
      <Navbar dark expand="md">
        <div className="container">
          <div className="toggler">
            <NavbarToggler onClick={toggleNav} />
            <NavbarBrand className='logo' href="/">
              <img className="img" src='logo192.png' alt='log' />
            </NavbarBrand>
          </div>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to='/'>
                  <span className="fa fa-home fa-lg"></span>Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to='/space'>
                  <span className="fa fa-info fa-lg"></span>Create Learning Space
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="button" navbar>
              <NavItem>
                <Button outline onClick={toggleModal}>
                  <span className="fa fa-sign-in fa-lg"></span>Login
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <div className="modal-header">
          <div className="modal-titel">Login</div>
          <Button className="btn-close" onClick={toggleModal}>
            <span>x</span>
          </Button>
        </div>
        <ModalBody>
          <Form onSubmit={handlelogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" name="username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
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
            <Button type="submit" value="submit" color="primary">Login</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
  
export default Header;