import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import fullLogo from '../../assets/images/fulllogo.jpg';

const Header = ({loading, signOut, auth, user}) => {

  return (
    <footer className="footer-distributed">

      <div className="footer-left">
        <h3>
          <img src={fullLogo} alt="Smart Fortwo new"/>
        </h3>
        <p className="footer-company-name">Smart Move Car Hire Limited &copy; 2017</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>21 Revolution Street</span> Paris, France</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+44 (0) 207 060 9505</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:info@whatasmartmove.co.uk">info@whatasmartmove.co.uk</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>
        <div className="footer-icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-github"></i></a>
        </div>
      </div>
      
    </footer>
  );
};

Header.propTypes = {
  signOut: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Header;
