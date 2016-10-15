import * as React from 'react';

import FacebookLoginButton from '../components/FacebookLoginButton';

const Home = props => {
  return (
    <div>
      <h1 style={{fontSize: 128, color: 'green'}}>Hello friends!</h1>
      <FacebookLoginButton />
    </div>
  );
}
export default Home;