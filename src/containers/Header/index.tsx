import { useEffect, useState } from 'react';
import { useLocation  } from "react-router-dom";
import { Button } from 'reactstrap';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import UserTooltip from './UserTooltip';
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

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  let location = useLocation();

  const getTitle = (path: string) => {
    const temp = path.split('/');
    if (temp[1] === 'space' && temp[2] === 'create') {
      return 'Create Learning Space';
    } else if (temp[1] === 'space' && temp[3] === 'post' && temp[4] === 'create') {
      return 'Create Learning Post';
    } else {
      return path.split('/')[1] || 'home';
    }
  }

  const [title, setTitle] = useState<string>(getTitle(location.pathname) || 'home');

  useEffect(() => {
    setTitle(getTitle(location.pathname));
  }, [location]);

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
    <UserTooltip
      handleLogout={handleLogout}
      userName={userName}
    >
      <span>{userNameSafe.substring(0, 2)}</span>
    </UserTooltip>
  );

  return (
    <div className='header'>
      <div className='header-container'>
        <div className='logo'>
          <a href='/'><IconBlackHole /></a>
        </div>
        <div className='title'>
          {title}
        </div>
        {
          authStatus === false ? (
            <div className='button'>
              <Button outline onClick={toggleLoginModal}>
                <span className='fa fa-sign-in fa-lg'></span>Log in
              </Button>
              <Button outline onClick={toggleSignUpModal}>
                <span className='fa fa-user fa-lg'></span>Sign Up
              </Button>
            </div>
          ) : (
            <div className='user'>
              {userIcon}
            </div>
          )
        }
      </div>
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