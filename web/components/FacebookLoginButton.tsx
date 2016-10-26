import './FacebookLoginButton.scss';

import * as React from 'react';

import InkRipple from './InkRipple';

const logo = require('../assets/facebook-login.png');

const FacebookLoginButton = (props: React.HTMLAttributes) => {
  let facebookButtonStyle = {
    background: logo
  };

  return (
    <button type="button" {...this.props} className="FacebookLoginButton">
      <a href="/api/auth/facebook" style={{position: 'relative', zIndex: 5}}>
        <img src={logo} style={{width: "100%"}}/>
      </a>
      <InkRipple />
    </button>
  );
};
export default FacebookLoginButton;