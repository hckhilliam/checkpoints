import * as validator from 'validator';

import * as user from './api/user';
import { setAccessToken, clear } from './auth';

export function login(data: Checkpoints.Login) {
  return user.login(data).then(token => {
    setAccessToken(token);
    return token;
  });
}

export function logout() {
  clear();
  user.logout().then(() => {
    window.location.href = '/';
  });
}

export function validate(data: Checkpoints.Login) {
  const errors = {};

  if (!data.email) {
    errors['email'] = 'What\'s your email?';
  } else if (!validator.isEmail(data.email)) {
    errors['email'] = 'Oops, that\'s not a valid email' ;
  }

  if (!data.password) {
    errors['password'] = 'Enter you password';
  }

  return errors;
}