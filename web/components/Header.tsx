import './Header.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import { reset } from '../actions/global';
import { logout } from '../lib/auth';
import { openDialog } from '../actions/dialog';

import SearchBar from './SearchBar';
import { UserSettingsForm } from './UserSettings';


interface HeaderProps {
  user?: Checkpoints.User;
  onLogout?: () => void;
  onOpenSettings?: () => void;
}

export class Header extends React.Component<HeaderProps, {}> {
  render() {
    const { user, onLogout, onOpenSettings } = this.props;

    const pictureUrl = _.get(user, 'picture.url') as string;
    const picture = pictureUrl ? <img src={pictureUrl} /> : null;

    return (
      <div className="Header">
        <div className="Header-content">
          <h1 className="Header-title">Checkpoints</h1>
          <SearchBar />
          <div className="Header-user" onClick={onOpenSettings}>
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
    user: state.users.me
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(reset());
      logout();
    },
    onOpenSettings: () => {
      dispatch(openDialog(<UserSettingsForm />, {
        size: 'Medium',
        title: 'User Settings'
      }));
    }
  };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContainer;