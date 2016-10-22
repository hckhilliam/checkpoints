import * as React from 'react';
import { connect } from 'react-redux';

import Input from './Input';

interface RegistrationFormProps {

}

interface RegistrationFormState {
  name?: string;
  email?: string;
  password?: string;
}

export class RegistrationForm extends React.Component<RegistrationFormProps, RegistrationFormState> {
  state: RegistrationFormState = {
    name: '',
    email: '',
    password: ''
  }

  onChangeName = event => {
    this.setState({ name: event.target.value });
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  onSubmit = () => {

  }

  render() {
    return (
      <form className="RegistrationForm" onSubmit={this.onSubmit}>
        <Input
          className="RegistrationForm-input"
          type="text"
          label="Name"
          value={this.state.name}
          onChange={this.onChangeName}
        />
        <Input
          className="RegistrationForm-input"
          type="text"
          label="Email"
          value={this.state.email}
          onChange={this.onChangeEmail}
        />
        <Input
          className="RegistrationForm-input"
          type="password"
          label="Password"
          value={this.state.password}
          onChange={this.onChangePassword}
        />
        <button className="RegistrationForm-button" type="submit">Register</button>
      </form>
    );
  }
}

export default RegistrationForm;