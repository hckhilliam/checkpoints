import './LoginForm.scss';

import * as React from 'react';
import { reduxForm, FormProps, SubmissionError } from 'redux-form';
import * as classnames from 'classnames';

import { login, validate } from '../lib/login';

import Input, { InputField } from './Input';
import Button from './Button';

export class LoginForm extends React.Component<FormProps<Checkpoints.Login, {}>, {}> {
  render() {
    const { handleSubmit, invalid, submitting, error } = this.props;
    const disabled = invalid || submitting;

    const cssClass = classnames('LoginForm', {
      'LoginForm--error': !!error
    });

    return (
      <form className={cssClass} onSubmit={handleSubmit} autoComplete="off">
        <InputField type="text" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <Button className="LoginForm-button" type="submit" primary disabled={disabled}>
          {submitting ? 'Logging in' : 'Login'}
        </Button>
        <div className="LoginForm-error">{error}</div>
      </form>
    );
  }
}

const LoginReduxForm = reduxForm({
  form: 'LoginForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Login) => {
    return new Promise((resolve, reject) => {
      return login(values)
        .then(resolve)
        .catch(err => {
          reject(new SubmissionError({ _error: 'Incorrect login' }));
        });
    });
  },
  onSubmitSuccess: (result, dispatch) => {
    // todo
  }
})(LoginForm);

export default LoginReduxForm;