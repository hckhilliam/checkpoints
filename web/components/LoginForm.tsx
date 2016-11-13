import './LoginForm.scss';

import * as React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';

import { login, validate } from '../lib/forms/login';

import Form from './Form';
import { InputField } from './Input';
import Button from './Button';
import FormButtons from './FormButtons';

export class LoginForm extends React.Component<React.HTMLAttributes, {}> {
  render() {
    const { submitting } = this.props;
    return (
      <Form className="LoginForm" {...this.props}>
        <InputField type="text" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <FormButtons align="center">
          <Button className="LoginForm-button" type="submit" primary>
            {submitting ? 'Logging in' : 'Login'}
          </Button>
        </FormButtons>
      </Form>
    );
  }
}

const LoginReduxForm = reduxForm({
  form: 'LoginForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Forms.Login) => {
    return new Promise((resolve, reject) => {
      return login(values)
        .then(resolve)
        .catch(err => {
          reject(new SubmissionError({ _error: 'Incorrect login' }));
        });
    });
  }
})(LoginForm);

export default LoginReduxForm;