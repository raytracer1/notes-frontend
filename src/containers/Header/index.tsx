import { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ProfileTooltip from './ProfileTooltip';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loginUserAction, clearLoginErrAction, logoutUserAction,
  signupUserAction, clearSignupErrAction,
} from '../../store/reducers/auth.reducer';
import { ReactComponent as IconBlackHole } from '../../assets/svg/black-hole.svg';
import './style.scss';

function Header() {
  const authStatus = useAppSelector((state) => state.auth.authenticated);
  const loginStatus = useAppSelector((state) => state.auth.login);
  const loginErr = useAppSelector((state) => state.auth.loginErr);
  const userName = useAppSelector((state) => state.auth.user.userName);
  const signupStatus = useAppSelector((state) => state.auth.signup);
  const signupErr = useAppSelector((state) => state.auth.signupErr);
  const dispatch = useAppDispatch();

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  const handleLogin = (email: string, passWord: string) => {
    dispatch(loginUserAction({email, passWord}));
  }

  const clearLoginErr = () => {
    dispatch(clearLoginErrAction());
  }

  const handleLogout = () => {
    dispatch(logoutUserAction());
  }

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  const handleSignUp = (userName: string, email: string, passWord: string) => {
    dispatch(signupUserAction({userName, email, passWord}));
  }

  const clearSignupErr = () => {
    dispatch(clearSignupErrAction());
  }

  const userNameSafe = userName ? userName : "Visitor";
  const userIcon = (
    isProfileModalOpen ? (
      <span>{userNameSafe.substring(0, 2)}</span>
    ) : (
      <ProfileTooltip
        handleLogout={handleLogout}
      >
        <span>{userNameSafe.substring(0, 2)}</span>
      </ProfileTooltip>
    )
  );

  return (
    <div className='header'>
      <Navbar dark expand='md'>
        <div className='container'>
          <div className='toggler'>
            <NavbarToggler onClick={toggleNav} />
            <NavbarBrand className='logo' href="/">
              <img className='img' src='logo192.png' alt='log' />
            </NavbarBrand>
            {
              authStatus === true && (
                <div className='user mobile'>
                  {userIcon}
                </div>
              )
            }
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
                  <IconBlackHole />Create Learning Space
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
                <div className='user desktop'>
                  {userIcon}
                </div>
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
        loginErr={loginErr}
        clearLoginErr={clearLoginErr}
      />
      <SignUpModal
        isModalOpen={isSignUpModalOpen}
        toggleModal={toggleSignUpModal}
        handleSignUp={handleSignUp}
        signupStatus={signupStatus}
        signupErr={signupErr}
        clearSignupErr={clearSignupErr}
      />
    </div>
  );
}
  
export default Header;