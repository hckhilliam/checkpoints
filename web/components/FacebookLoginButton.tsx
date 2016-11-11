import './FacebookLoginButton.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import InkRipple from './InkRipple';

const logo = require('../assets/facebook-login.png');

class FacebookLoginButton extends React.Component<React.HTMLAttributes, {}> {
  render() {
    const cssClass = classnames('FacebookLoginButton', this.props.className);

    return (
      <a href="/api/auth/facebook" {...this.props} className={cssClass}>
        <img src={logo} />
        {this.props.children}
      </a>
    );
  }
};
export default InkRipple(FacebookLoginButton);