import './RegistrationForm.scss';

import * as React from 'react';
import { reduxForm, FormProps } from 'redux-form';

import { register, validate } from '../lib/registration';

import Input, { InputField } from './Input';
import Button from './Button';

interface RegistrationFormProps extends FormProps<Checkpoints.Registration, {}> {

}

export class RegistrationForm extends React.Component<RegistrationFormProps, {}> {
  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    const disabled = invalid || submitting;
    return (
      <form className="RegistrationForm" onSubmit={handleSubmit} autoComplete="off">
        <InputField type="text" label="Name" name="name" />
        <InputField type="text" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <Button className="RegistrationForm-button" type="submit" primary disabled={disabled}>Register</Button>
      </form>
    );
  }
}

const RegistrationReduxForm = reduxForm({
  form: 'RegistrationForm',
  onSubmit: (values: Checkpoints.Registration) => register(values),
  validate: validate as any
})(RegistrationForm);

export default RegistrationReduxForm;