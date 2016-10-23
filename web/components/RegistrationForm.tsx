import './RegistrationForm.scss';

import * as React from 'react';
import { reduxForm, FormProps } from 'redux-form';

import { register, validate, RegistrationData } from '../lib/registration';

import Input, { InputField } from './Input';
import Button from './Button';

interface RegistrationFormProps extends FormProps<RegistrationData, {}> {

}

export class RegistrationForm extends React.Component<RegistrationFormProps, {}> {
  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    const disabled = invalid || submitting;
    return (
      <form className="RegistrationForm" onSubmit={handleSubmit}>
        <InputField type="text" label="Name" name="name" />
        <InputField type="text" label="Email" name="email" />
        <InputField type="text" label="Password" name="password" />
        <Button className="RegistrationForm-button" type="submit" primary disabled={disabled}>Register</Button>
      </form>
    );
  }
}

const RegistrationReduxForm = reduxForm({
  form: 'RegistrationForm',
  onSubmit: (values: RegistrationData) => register(values),
  validate: validate as any
})(RegistrationForm);

export default RegistrationReduxForm;