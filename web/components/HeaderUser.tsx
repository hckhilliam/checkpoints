import './HeaderUser.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { MaterialIcon } from './Icon';
import Profile from './Profile';

import { getNotifications } from '../actions/notifications';
import { openDialog } from '../actions/dialog';

interface HeaderUserProps {
  user?: Checkpoints.User;
  notifications?: Checkpoints.Notifications;
  onClick?: () => void;
  onGetNotifications?: () => void;
}

export class HeaderUser extends React.Component<HeaderUserProps, {}> {
  notificationInterval: number;

  componentDidMount() {
    const { onGetNotifications } = this.props;
    onGetNotifications();
    this.notificationInterval = window.setInterval(onGetNotifications, 15000);
  }

  componentWillUnmount() {
    window.clearInterval(this.notificationInterval);
  }

  render() {
    const { user, notifications, onClick } = this.props;

    const pictureUrl = _.get(user, 'picture.url') as string;
    const picture = pictureUrl ? <img src={pictureUrl} /> : null;

    const pictureClass = classnames('HeaderUser-picture', {
      'HeaderUser-picture--empty': !pictureUrl
    });

    let hasNotifications = false;
    _.forEach(notifications, (n: any[]) => {
      hasNotifications = hasNotifications || n.length > 0;
    });

    return (
      <div className="HeaderUser" onClick={onClick}>
        <div className={pictureClass}>
          {picture}
          {hasNotifications &&
            <div className="HeaderUser-notification-icon">
              <MaterialIcon icon="message" />
            </div>
          }
        </div>
        <h2 className="HeaderUser-name">{user.name}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State) => {
  return {
    user: state.users.me,
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetNotifications: () => {
      dispatch(getNotifications());
    },
    onClick: () => {
      dispatch(openDialog(<Profile />, {
        size: 'Medium'
      }));
    }
  };
};

const HeaderUserContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderUser);
export default HeaderUserContainer;
