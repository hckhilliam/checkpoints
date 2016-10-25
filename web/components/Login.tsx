import './Login.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

interface LoginState {
  login?: boolean;
}

export default class Login extends React.Component<{}, LoginState> {
  state: LoginState = {
    login: true
  }

  handleLogin = () => {
    this.setState({ login: true });
  }

  handleRegister = () => {
    this.setState({ login: false });
  }

  render() {
    const cssClass = classnames('Login');

    const form = this.state.login
      ? <LoginForm />
      : <RegistrationForm />;

    return (
      <div className={cssClass}>
        {form}
        <div className="Login-actions">
          {
            this.state.login
              ? <a href="javascript://" onClick={this.handleRegister}>Don't have an account?</a>
              : <a href="javascript://" onClick={this.handleLogin}>Got an account?</a>
          }
        </div>
      </div>
    );
  }
}