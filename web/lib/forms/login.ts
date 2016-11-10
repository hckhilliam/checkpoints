import * as validator from 'validator';

import * as auth from '../api/auth';
import { setAccessToken } from '../auth';

export function login(data: Checkpoints.Forms.Login) {
  return auth.login(data).then(token => {
    setAccessToken(token);
    return token;
  });
}

export function validate(data: Checkpoints.Forms.Login) {
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