import './RegistrationForm.scss';

import * as React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';

import { register, validate } from '../lib/forms/registration';

import Form from './Form';
import Input, { InputField } from './Input';
import Button from './Button';
import FormButtons from './FormButtons';

export class RegistrationForm extends React.Component<React.HTMLAttributes, {}> {
  render() {
    const { submitting } = this.props;
    return (
      <Form className="RegistrationForm" {...this.props}>
        <InputField type="text" label="Name" name="name" />
        <InputField type="text" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <FormButtons align="center">
          <Button className="RegistrationForm-button" type="submit" primary>
            {submitting ? 'Creating account' : 'Register'}
          </Button>
        </FormButtons>
      </Form>
    );
  }
}

const RegistrationReduxForm = reduxForm({
  form: 'RegistrationForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Forms.Registration) => {
    return new Promise((resolve, reject) => {
      register(values)
        .then(resolve)
        .catch(err => {
          reject(new SubmissionError({ _error: err }));
        });
    });
  }
})(RegistrationForm);

export default RegistrationReduxForm;