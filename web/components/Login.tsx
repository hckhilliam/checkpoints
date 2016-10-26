import './Login.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import Panel from '../components/Panel';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import FacebookLoginButton from './FacebookLoginButton';

interface LoginState {
  login?: boolean;
}

export default class Login extends React.Component<React.HTMLAttributes, LoginState> {
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
    const { className } = this.props;
    const other = _.omit(this.props, 'className');
    const cssClass = classnames('Login', this.props.className);

    const form = this.state.login
      ? <LoginForm />
      : <RegistrationForm />;

    return (
      <div className={cssClass} {...other}>
        <FacebookLoginButton />
        <div className="Login-separator">
          <p className="Login-separator-line"> OR </p>
        </div>
        <div className="Login-email">Continue with email</div>
        <div className="Login-form">
          <Panel className="Login-panel">
            {form}
          </Panel>
          <div className="Login-actions">
            {
              this.state.login
                ? <a href="javascript://" onClick={this.handleRegister}>Don't have an account?</a>
                : <a href="javascript://" onClick={this.handleLogin}>Got an account?</a>
            }
          </div>
        </div>
      </div>
    );
  }
}