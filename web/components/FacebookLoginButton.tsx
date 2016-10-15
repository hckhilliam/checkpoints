import * as React from 'react';
import { connect } from 'react-redux';

import { checkLogin, logout, loginDialog } from '../lib/auth';

interface Props {
  onLogin: () => void;
}

export class FacebookLoginButton extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <button onClick={checkLogin}>Check Login</button>
        <button onClick={loginDialog}>Login Dialog</button>
        <button onClick={logout}>Logout</button>
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