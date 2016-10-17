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
      <div className="facebook-login">
        <FacebookLoginButton />
      </div>
      <div className="email-login">
        <p className="separator"> OR </p>
        <input type="text" placeholder="Email Address"/>
        <input type="password" placeholder="Password"/>
        <button>Log In</button>
      </div>
    </div>
  );
}
export default Home;
