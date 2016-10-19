import * as React from 'react';
import { connect } from 'react-redux';

import { isLoggedIn, isFacebookLoggedIn, logout } from '../lib/auth';

interface AuthTestProps {
  // onLogout: () => void;
}

class AuthTest extends React.Component<AuthTestProps, {}> {
  onLogout = () => {
    logout();
  }

  render() {
    return (
      <div>
        <div>Logged in: {isLoggedIn() ? 'true' : 'false'}</div>
        <div>Facebook: {isFacebookLoggedIn() ? 'true' : 'false'}</div>
        <button type="button" onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}
export default AuthTest;

// const mapStateToProps = (state: Checkpoints.State) => {
//   return {

//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onLogout: () => dispatch()
//   };
// }

// const AuthTestContainer = connect(mapStateToProps, mapDispatchToProps)(AuthTest);
// export default AuthTestContainer;