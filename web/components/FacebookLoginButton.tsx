import * as React from 'react';
import { connect } from 'react-redux';

import { checkLogin } from '../lib/auth';

interface Props {
  onLogin: () => void;
}

export class FacebookLoginButton extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <button onClick={checkLogin}>Test</button>
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