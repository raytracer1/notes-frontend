import { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import './style.scss';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  const handlelogin = (event:any) => {
    toggleLoginModal();
    alert(" email: " + email + " Password: " + passWord
        + " Remember: " + remember);
    event.preventDefault();
    setEmail('');
    setPassWord('');
    setRemember(false);
  }

  const handleSignUp = (event:any) => {
    toggleSignUpModal();
    alert(" userName: " + userName + " Password: " + passWord
        + " email: " + email);
    event.preventDefault();
    setUserName('');
    setEmail('');
    setPassWord('');
  }

  return (
    <div className='header'>
      <Navbar dark expand='md'>
        <div className='container'>
          <div className='toggler'>
            <NavbarToggler onClick={toggleNav} />
            <NavbarBrand className='logo' href="/">
              <img className='img' src='logo192.png' alt='log' />
            </NavbarBrand>
          </div>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className='nav-link' to='/'>
                  <span className='fa fa-home fa-lg'></span>Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className='nav-link' to='/space'>
                  <span className='fa fa-book fa-lg'></span>Create Learning Space
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className='button' navbar>
              <NavItem>
                <Button outline onClick={toggleLoginModal}>
                  <span className='fa fa-sign-in fa-lg'></span>Login
                </Button>
              </NavItem>
              <NavItem>
                <Button outline onClick={toggleSignUpModal}>
                  <span className='fa fa-user fa-lg'></span>Sign Up
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <LoginModal
        email={email}
        setEmail={setEmail}
        passWord={passWord}
        setPassWord={setPassWord}
        remember={remember}
        setRemember={setRemember}
        isModalOpen={isLoginModalOpen}
        toggleModal={toggleLoginModal}
        handleLogin={handlelogin}
      />
      <SignUpModal
        userName={userName}
        setUserName={setUserName}
        email={email}
        setEmail={setEmail}
        passWord={passWord}
        setPassWord={setPassWord}
        isModalOpen={isSignUpModalOpen}
        toggleModal={toggleSignUpModal}
        handleSignUp={handleSignUp}
      />
    </div>
  );
}
  
export default Header;