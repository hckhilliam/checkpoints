import * as checkpoints from '../api/checkpoints';

export function addCheckpoint(data: Checkpoints.Forms.Checkpoint) {
  return checkpoints.addCheckpoint(data as Checkpoints.Checkpoint)
    .catch(err => {
      throw err.error.error;
    });
}

export function validate(data: Checkpoints.Forms.Checkpoint) {
  const errors = {};

  if (!data.title) {
    errors['title'] = 'Add a title';
  }

  if (!data.description) {
    errors['description'] = 'What\'s this checkpoint about?';
  } else if (data.description.length > 4000) {
    errors['description'] = 'Oops, this description is too long';
  }

  return errors;
}