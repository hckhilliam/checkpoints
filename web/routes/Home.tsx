import './Home.scss'

import * as React from 'react';

import Login from '../components/Login';

const logo = require('../assets/logo.png');

const Home = props => {
  return (
    <div className="Home">
      <img className="Home-logo" src={logo} />
      <Login className="Home-login" />
    </div>
  );
}
export default Home;
