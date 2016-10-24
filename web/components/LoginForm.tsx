import './LoginForm.scss';

import * as React from 'react';
import { reduxForm, FormProps } from 'redux-form';

import { login, validate } from '../lib/login';

import Input, { InputField } from './Input';
import Button from './Button';

export class LoginForm extends React.Component<FormProps<Checkpoints.Login, {}>, {}> {
  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    const disabled = invalid || submitting;
    return (
      <form className="LoginForm" onSubmit={handleSubmit} autoComplete="off">
        <InputField type="text" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <Button className="LoginForm-button" type="submit" primary disabled={disabled}>Login</Button>
      </form>
    );
  }
}

const LoginReduxForm = reduxForm({
  form: 'LoginForm',
  onSubmit: (values: Checkpoints.Login) => login(values),
  validate: validate as any
})(LoginForm);

export default LoginReduxForm;