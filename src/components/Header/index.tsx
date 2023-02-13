import { Nav, Navbar, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';

function Header() {
    return (
      <div className='header'>
        <div className='container'>
          <a className='logo' href='/' target="_top">
            <img className='logo' src='logo192.png' alt='logo' />
          </a>
          <Navbar>
            <Nav navbar>
              <div className="nav">
                <NavItem>
                  <NavLink className="nav-link"  to='/home'>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/space'>Create Learning Space</NavLink>
                </NavItem>
              </div>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }
  
export default Header;