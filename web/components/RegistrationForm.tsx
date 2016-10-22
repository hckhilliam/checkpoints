import './RegistrationForm.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Input from './Input';
import Button from './Button';

interface RegistrationFormProps {

}

interface RegistrationFormState {
  name?: string;
  email?: string;
  password?: string;
  valid?: boolean;
}

export class RegistrationForm extends React.Component<RegistrationFormProps, RegistrationFormState> {
  state: RegistrationFormState = {
    name: '',
    email: '',
    password: '',
    valid: false
  }

  validate() {
    if (!this.state.valid) {
      this.setState({ valid: true });
    }
  }

  handleChangeName = event => {
    this.setState({ name: event.target.value });
    this.validate();
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
    this.validate();
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
    this.validate();
  }

  handleSubmit = event => {
    event.preventDefault();

  }

  render() {
    return (
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <Input
          className="RegistrationForm-input"
          type="text"
          label="Name"
          value={this.state.name}
          onChange={this.handleChangeName}
        />
        <Input
          className="RegistrationForm-input"
          type="text"
          label="Email"
          value={this.state.email}
          onChange={this.handleChangeEmail}
        />
        <Input
          className="RegistrationForm-input"
          type="password"
          label="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
        />
        <Button className="RegistrationForm-button" type="submit" primary>Register</Button>
      </form>
    );
  }
}

export default RegistrationForm;