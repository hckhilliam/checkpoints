import * as checkpoints from '../api/checkpoints';

export function addCheckpoint(data: Checkpoints.Forms.Checkpoint) {
  const checkpoint: Checkpoints.Checkpoint = {
    title: _.trim(data.title),
    description: _.trim(data.description),
    isPrivate: data.private
  };
  return checkpoints.addCheckpoint(checkpoint)
    .catch(err => {
      throw err.error.error;
    });
}

export function editCheckpoint(data: Checkpoints.Forms.Checkpoint) {
  const checkpoint: Checkpoints.Checkpoint = {
    id: data.id,
    title: _.trim(data.title),
    description: _.trim(data.description),
    notes: _.trim(data.notes),
    isPrivate: data.private
  };
  return checkpoints.saveCheckpoint(checkpoint)
    .catch(err => {
      throw err.error.error;
    });
}

export function validate(data: Checkpoints.Forms.Checkpoint) {
  const errors = {};

  if (!data)
    return errors;

  if (_.isEmpty(_.trim(data.title))) {
    errors['title'] = 'Add a title';
  }

  // if (!data.description || _.isEmpty(data.description.trim())) {
  //   errors['description'] = 'What\'s this checkpoint about?';
  // } else if (data.description.length > 4000) {
  //   errors['description'] = 'Oops, this description is too long';
  // }

  if (_.get(data.description, 'length') > 4000) {
    errors['description'] = 'Oops, this description is too long';
  }

  return errors;
}

export function validateComplete(data: Checkpoints.Forms.Checkpoint) {
  const errors = {};

  if (data.notes.length > 4000) {
    errors['notes'] = 'Oops, these notes are too long';
  }

  return errors;
}