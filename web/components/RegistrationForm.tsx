import './RegistrationForm.scss';

import * as React from 'react';
import { reduxForm, FormProps, SubmissionError } from 'redux-form';

import { register, validate } from '../lib/registration';

import Input, { InputField } from './Input';
import Button from './Button';
import FormMessage from './FormMessage';

interface RegistrationFormProps extends FormProps<Checkpoints.Registration, {}> {

}

export class RegistrationForm extends React.Component<RegistrationFormProps, {}> {
  render() {
    const { handleSubmit, invalid, submitting, error } = this.props;
    const disabled = invalid || submitting;
    return (
      <form className="RegistrationForm" onSubmit={handleSubmit} autoComplete="off">
        <InputField type="text" label="Name" name="name" />
        <InputField type="text" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <Button className="RegistrationForm-button" type="submit" primary disabled={disabled}>
          {submitting ? 'Creating account' : 'Register'}
        </Button>
        <FormMessage type="Error">{(!submitting && error) ? error : null}</FormMessage>
      </form>
    );
  }
}

const RegistrationReduxForm = reduxForm({
  form: 'RegistrationForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Registration) => {
    return new Promise((resolve, reject) => {
      register(values)
        .then((resolve))
        .catch(err => {
          reject(new SubmissionError({ _error: err }));
        });
    });
  }
})(RegistrationForm);

export default RegistrationReduxForm;