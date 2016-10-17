import * as React from 'react';
import { connect } from 'react-redux';
import { checkLogin, logout, loginDialog } from '../lib/auth';

const logo = require('../assets/facebook-login.png');

interface Props {
  onLogin: () => void;
}

export class FacebookLoginButton extends React.Component<Props, {}> {
  render() {

    let facebookButtonStyle = {
      background: logo
    };
    return (
      <div>
      {
        // <button onClick={checkLogin}>Check Login</button>
      }
        <button onClick={loginDialog}>
          <img src={logo} style={{width: "100%"}}/>
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
      // checkLogin();
    }
  };
}

const FacebookLoginButtonContainer = connect(mapStateToProps, mapDispatchToProps)(FacebookLoginButton);
export default FacebookLoginButtonContainer;
