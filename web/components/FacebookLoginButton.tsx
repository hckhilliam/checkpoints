import './FacebookLoginButton.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import InkRipple from './InkRipple';

const logo = require('../assets/facebook-login.png');

const FacebookLoginButton = (props: React.HTMLAttributes) => {
  const cssClass = classnames('FacebookLoginButton', props.className);

  return (
    <a href="/api/auth/facebook" {...this.props} className={cssClass}>
      <img src={logo} />
      <InkRipple />
    </a>
  );
};
export default FacebookLoginButton;