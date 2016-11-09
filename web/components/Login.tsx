import './Login.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import Panel from '../components/Panel';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import FacebookLoginButton from './FacebookLoginButton';

import { getInfo } from '../actions/user';
import { dashboard } from '../actions/routing';

interface LoginProps extends React.HTMLAttributes {
  onSubmitSuccess?: () => void;
}

interface LoginState {
  login?: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
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
    const { className, onSubmitSuccess } = this.props;
    const other = _.omit(this.props, 'className', 'onSubmitSuccess');
    const cssClass = classnames('Login', this.props.className);

    const form = this.state.login
      ? <LoginForm onSubmitSuccess={onSubmitSuccess} />
      : <RegistrationForm onSubmitSuccess={onSubmitSuccess} />;

    return (
      <div className={cssClass} {...other}>
        <FacebookLoginButton />
        <div className="Login-separator">
          <p className="Login-separator-line"> OR </p>
        </div>
        <div className="Login-form">
          <Panel className="Login-panel">
            <div className="Login-email">{this.state.login ? 'Continue with email' : 'New account'}</div>
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmitSuccess: () => {
      dispatch(getInfo());
      dispatch(dashboard());
    }
  };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;