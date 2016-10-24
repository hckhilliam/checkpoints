import './Home.scss'

import * as React from 'react';

import FacebookLoginButton from '../components/FacebookLoginButton';
import AuthTest from '../components/AuthTest';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';

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
        <span>Continue with email</span>
      </div>
      <LoginForm />
      <RegistrationForm />
      <AuthTest />
    </div>
  );
}
export default Home;
