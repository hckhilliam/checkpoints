import * as user from '../api/user';
import { updateUser } from '../../actions/users';

export function updateUserSettings(data: Checkpoints.Forms.User) {
  const userData: Checkpoints.User = data as Checkpoints.User;

  return user.updateUser(userData).catch(err => {
    throw err.error.error;
  });
}

export function validate(data: Checkpoints.Forms.User) {
  const errors = {};

  if (!data) return errors;

  if (!data.name || _.isEmpty(data.name.trim())) {
    errors['name'] = 'Name cannnot be blank';
  }

  return errors;
}