import './Header.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { reset } from '../actions/global';
import { logout } from '../lib/auth';

import SearchBar from './SearchBar';
import HeaderUser from './HeaderUser';

interface HeaderProps {
  onLogout?: () => void;
}

export class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { onLogout } = this.props;

    return (
      <div className="Header">
        <div className="Header-content">
          <h1 className="Header-title">Checkpoints</h1>
          <SearchBar />
          <HeaderUser />
          <a className="Header-logout" href="javascript://" onClick={onLogout}>Logout</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(reset());
      logout();
    }
  };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;