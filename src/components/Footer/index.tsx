import './style.scss';
import { Link } from 'react-router-dom';

function Footer() {
    return (
      <div className='footer'>
        <div className='footer-container'>
          <div className='content'>
            <div className='links'>
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/space'>Create Learning Space</Link></li>
              </ul>
            </div>
            <div className="address">
              <h5>Our Address</h5>
              <address>
                TianFu New Zone<br />
                Chengdu,Sichuan<br />
                China<br />
                <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:zhengbijun123@gmail.com">
                  zhengbijun123@gmail.com</a>
              </address>
            </div>
            <div className="social">
              <div className="text-center">
                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                <a className="btn btn-social-icon" href="mailto:zhengbijun123@gmail.com"><i className="fa fa-envelope-o"></i></a>
              </div>
            </div>
          </div>
          <div className='copyright'>
            <p>© Copyright 2023 raytracer1</p>
          </div>
        </div>
      </div>
    );
  }
  
export default Footer;