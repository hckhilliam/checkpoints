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
      <Login className="Home-login" />
    </div>
  );
}
export default Home;
