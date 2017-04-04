import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';
import AdminLink from './AdminLink';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import thumblogo from '../../assets/images/thumb.jpeg';
import textlogo from '../../assets/images/textlogo.jpg';

const Header = ({loading, signOut, auth, user}) => {

  let loginLogoutLink = auth.isLogged ? <Link onClick={signOut} activeClassName="active">Logout</Link> : <Link to="/login" activeClassName="active">Login</Link>;
  let signupAccountLink = auth.isLogged ? <Link to="/account" activeClassName="active">My Account</Link> : <Link to="/register" activeClassName="active">Sign up</Link>;
  let adminLink = user.isAdmin ? <AdminLink /> : null;

  return (
    <div>
    <Navbar collapseOnSelect className="Header">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <img src={thumblogo} alt="SmartMove"/>
            <img src={textlogo} alt="SmartMove"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight className="hidden-xs">
          { auth.isLogged ? (
            <NavItem><Link to="/bookings" activeClassName="active">Bookings</Link></NavItem>
          ):null}
          { auth.isLogged ? (
            <NavItem><Link to="/reviews" activeClassName="active">Reviews</Link></NavItem>
          ):null}
          <NavItem>
            {signupAccountLink}
          </NavItem>
          <NavItem>
            {loginLogoutLink}
          </NavItem>
        </Nav>
        <Nav pullRight className="visible-xs">
          <NavItem>
            {signupAccountLink}
          </NavItem>
          <NavItem>
            {loginLogoutLink}
          </NavItem>
          <NavItem eventKey={1} href="#">About</NavItem>
          <NavItem eventKey={2} href="#">How it works</NavItem>
          <NavItem eventKey={2} href="#">Pricing</NavItem>
          <NavItem eventKey={1} href="#">Commercial</NavItem>
          <NavItem eventKey={1} href="#">FAQs</NavItem>
          <NavItem eventKey={2} href="#">Contact us</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Navbar className="Subheader hidden-xs">
      <Navbar.Header>
        <Navbar.Brand>
        </Navbar.Brand>
        <Nav>
          <NavItem eventKey={1} href="#">About</NavItem>
          <NavItem eventKey={2} href="#">How it works</NavItem>
          <NavItem eventKey={2} href="#">Pricing</NavItem>
          <NavItem eventKey={1} href="#">Commercial</NavItem>
          <NavItem eventKey={1} href="#">FAQ</NavItem>
          <NavItem eventKey={2} href="#">Contact us</NavItem>
        </Nav>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem>{auth.isLogged ? '13 cars available now':''}</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
    // <nav>
    //   <IndexLink to="/" activeClassName="active">Home</IndexLink>
    //   {" | "}
    //   <Link to="/about" activeClassName="active">About</Link>
    //   {" | "}
    //   <Link to="/protected" activeClassName="active">Protected</Link>
    //   {adminLink}
    //   {" | "}
    //   {loginLogoutLink}
    //   {loading && <LoadingDots interval={100} dots={20}/>}
    // </nav>
  );
};

Header.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Header;
