import { useEffect, useState } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginUserAction, logoutUserAction,
} from '../../store/reducers/auth.reducer';
import './style.scss';

function Header() {
  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const loginStatus = useAppSelector((state) => state.auth.login);
  const userName = useAppSelector((state) => state.auth.user.userName);
  const dispatch = useAppDispatch();

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  const handleLogin = (userName: string, passWord: string) => {
    dispatch(loginUserAction({userName, passWord}));
  }

  const handleLogout = () => {
    dispatch(logoutUserAction());
  }

  const handleSignUp = (event:any) => {
    toggleSignUpModal();
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
            {
              authStatus === false ? (
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
              ) : (
                <Nav className='button' navbar>
                  <NavItem>
                    <Button outline onClick={handleLogout}>
                      <span className='fa fa-sign-out fa-lg'></span>logout
                    </Button>
                  </NavItem>
                  <NavItem>
                    <Button outline>
                      <span className='fa fa-user fa-lg'></span>{userName}
                    </Button>
                  </NavItem>
                </Nav>
              )
            }
          </Collapse>
        </div>
      </Navbar>
      <LoginModal
        isModalOpen={isLoginModalOpen}
        toggleModal={toggleLoginModal}
        handleLogin={handleLogin}
        loginStatus={loginStatus}
      />
      <SignUpModal
        isModalOpen={isSignUpModalOpen}
        toggleModal={toggleSignUpModal}
        handleSignUp={handleSignUp}
      />
    </div>
  );
}
  
export default Header;