import * as React from 'react';

import FacebookLoginButton from '../components/FacebookLoginButton';
import './Home.scss'

const Home = props => {
  return (
    <div className="home">
      <h1>
        checkp<i className="fa fa-check-circle-o" aria-hidden="true"></i>ints
      </h1>
      <div className="login-buttons">
        <FacebookLoginButton />
      </div>
    </div>
  );
}
export default Home;
