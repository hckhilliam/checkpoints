import * as React from 'react';
import { render } from 'react-dom';
import { Link }from 'react-router';

import FacebookLoginButton from '../components/FacebookLoginButton';

export default class Home extends React.Component<{},{}>{
  render() {
    return (
      <div>
        yooooo
        <FacebookLoginButton />
        <Link to="/dashboard"> dashboard? </Link>
      </div>
    );
  }
}
