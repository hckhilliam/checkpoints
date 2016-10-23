import api from './api';
import * as validator from 'validator';

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
}


export function register(data: RegistrationData) {
  return api.post('/api/user/register', data);
}

export function validate(data: RegistrationData) {
  const errors = {};

  if (!data.name) {
    errors['name'] = 'What should we call you?';
  }

  if (!data.email) {
    errors['email'] = 'What\'s your email?';
  } else if (!validator.isEmail(data.email)) {
    errors['email'] = 'Oops, that\'s not a valid email' ;
  }

  if (!data.password) {
    errors['password'] = 'You need a password';
  }

  return errors;
}