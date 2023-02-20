import {  Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';

function Header() {

  return (
    <div className='header'>
      <div className='container'>
        <a className='logo' href='/' target="_top">
          <img className='logo' src='logo192.png' alt='logo' />
        </a>
        <div className="nav">
          <NavLink className="nav-link" to='/home'>
            <i className="fa fa-home fa-lg"></i>home
          </NavLink>
          <NavLink className="nav-link" to='/space'>
            <i className="fa fa-info fa-lg"></i>Create Learning Space
          </NavLink>
        </div>
        <Button outline className='button'>
          <i className="fa fa-sign-in fa-lg"></i> Login
        </Button>
      </div>
    </div>
  );
}
  
export default Header;