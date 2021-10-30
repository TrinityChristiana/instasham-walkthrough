import React from 'react';
import {
  //
  Camera,
  Heart,
  Home,
  Search,
  User,
} from 'react-feather';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ userInfo, history, location }) => {
  const activeApp = location.pathname;
  const NavbarItems = () => (
    <div className="app-navbar-items">
      <div className="app-navbar-items-item">
        <Link to="/">
          <Home
            className={`${
              activeApp === '/' ? 'active-nav-item' : ''
            } app-navbar-items-item-logo`}
            strokeWidth="1.5"
          />
        </Link>
      </div>
      <div className="app-navbar-items-item">
        <Link to="/browse">
          <Search
            strokeWidth="1.5"
            className={`${
              activeApp === '/browse' ? 'active-nav-item' : ''
            } app-navbar-items-item-logo`}
          />
        </Link>
      </div>
      <div className="app-navbar-items-item">
        <Link to="/create">
          <Camera
            strokeWidth="1.5"
            className={`${
              activeApp === '/create' ? 'active-nav-item' : ''
            } app-navbar-items-item-logo`}
          />
        </Link>
      </div>
      <div className="app-navbar-items-item">
        <Link to="/hearts">
          <Heart
            strokeWidth="1.5"
            className={`${
              activeApp === '/hearts' ? 'active-nav-item' : ''
            } app-navbar-items-item-logo`}
          />
        </Link>
      </div>
      <div className="app-navbar-items-item">
        <Link to={`/sham/${userInfo.username}`}>
          <User
            strokeWidth="1.5"
            className={`${
              activeApp.includes('/sham/') ? 'active-nav-item' : ''
            } app-navbar-items-item-logo`}
          />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {userInfo && (
        <>
          <div className="app-navbar app-navbar-lg">
            <div
              onClick={() => history.push('/')}
              className="as-link app-navbar-logo"
              style={{
                backgroundImage:
                  'url(https://firebasestorage.googleapis.com/v0/b/instasham-bb5ca.appspot.com/o/instasham.png?alt=media&token=97d55556-6ddb-4bb8-8067-7c31a90bf467)',
              }}
              aria-hidden="true"
            />{' '}
            <NavbarItems />
          </div>
          <div className="app-navbar app-navbar-sm">
            <NavbarItems />
          </div>
        </>
      )}
    </>
  );
};

Navbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  userInfo: PropTypes.shape({ username: PropTypes.string.isRequired }),
};

Navbar.defaultProps = {
  location: undefined,
  userInfo: undefined,
};

export default withRouter(Navbar);
