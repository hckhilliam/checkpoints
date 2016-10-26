import './Home.scss'

import * as React from 'react';

import FacebookLoginButton from '../components/FacebookLoginButton';
import Login from '../components/Login';
import Panel from '../components/Panel';

const logo = require('../assets/logo.png');
const Home = props => {
  return (
    <div className="Home">
      <h1>
        <img src={logo} />
      </h1>
      <Panel className="Home-panel">
        <FacebookLoginButton className="Home-facebook" />
        <div className="Home-login">
          <p className="Home-login-line"> OR </p>
          <span className="login-email">Continue with email</span>
        </div>
        <Login />
      </Panel>
    </div>
  );
}
export default Home;
