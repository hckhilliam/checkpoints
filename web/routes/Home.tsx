import * as React from 'react';

import FacebookLoginButton from '../components/FacebookLoginButton';
import './Home.scss'

const logo = require('../assets/logo.png');
const Home = props => {
  return (
    <div className="home">
      <h1>
        <img src={logo} />
      </h1>
      <div className="login-buttons">
        <FacebookLoginButton />
      </div>
    </div>
  );
}
export default Home;
