import './Header.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { clearInfo } from '../actions/user';
import { logout } from '../lib/login';

interface HeaderProps {
  user?: Checkpoints.User;
  onLogout?: () => void;
}

export class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { user, onLogout } = this.props;
    return (
      <div className="Header">
        <div className="Header-content">
          <h1 className="Header-title">Checkpoints</h1>
          <h2 className="Header-user">{user.name}</h2>
          <a className="Header-logout" href="javascript://" onClick={onLogout}>Logout</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(clearInfo());
      logout();
    }
  };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;