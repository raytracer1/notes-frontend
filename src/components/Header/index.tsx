import { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,
  Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <div className='header'>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand href="/">
            <img className="img" src='logo192.png' alt='log' />
          </NavbarBrand>
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
                <Button outline>
                  <span className="fa fa-sign-in fa-lg"></span>Login
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}
  
export default Header;