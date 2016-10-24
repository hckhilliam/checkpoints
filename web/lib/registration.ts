import * as validator from 'validator';

import { register as registerUser } from './api/user';
import { setAccessToken } from './auth';

export function register(data: Checkpoints.Registration) {
  return registerUser(data).then(token => {
    setAccessToken(token);
    return token;
  });
}

export function validate(data: Checkpoints.Registration) {
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