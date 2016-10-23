import * as React from 'react';
import { connect } from 'react-redux';

import InkRipple from './InkRipple';
import { logout } from '../lib/auth';

const logo = require('../assets/facebook-login.png');

interface Props {
  onLogin?: () => void;
}

export class FacebookLoginButton extends React.Component<Props, {}> {
  render() {

    let facebookButtonStyle = {
      background: logo
    };
    return (
      <div>
        <button type="button" style={{position: 'relative'}}>
          <a href="/api/auth/facebook">
            <img src={logo} style={{width: "100%"}}/>
          </a>
          <InkRipple />
        </button>
      {
        // <button onClick={logout}>Logout</button>
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => {

    }
  };
}

const FacebookLoginButtonContainer = connect(mapStateToProps, mapDispatchToProps)(FacebookLoginButton);
export default FacebookLoginButtonContainer;
