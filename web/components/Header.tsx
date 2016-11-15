import './Header.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { clearInfo } from '../actions/user';
import { logout } from '../lib/auth';

import SearchBar from './SearchBar';

interface HeaderProps {
  user?: Checkpoints.User;
  onLogout?: () => void;
}

export class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { user, onLogout } = this.props;

    const pictureUrl = _.get(user, 'picture.url') as string;
    const picture = pictureUrl ? <img src={pictureUrl} /> : null;

    return (
      <div className="Header">
        <div className="Header-content">
          <h1 className="Header-title">Checkpoints</h1>
          <SearchBar />
          <div className="Header-user">
            <div className="Header-user-picture">
              {picture}
            </div>
            <h2 className="Header-user-name">{user.name}</h2>
          </div>
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