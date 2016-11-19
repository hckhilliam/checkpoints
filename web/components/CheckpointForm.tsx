import './CheckpointForm.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, initialize, reset } from 'redux-form';
import * as classnames from 'classnames';

import Form from './Form';
import { InputField, TextAreaField } from './Input';
import Button from './Button';
import { CheckboxField } from './Checkbox';
import FormButtons from './FormButtons';

import { addCheckpoint, editCheckpoint, validate } from '../lib/forms/checkpoint';
import { getCheckpoints, getCheckpoint } from '../actions/checkpoints';

interface CheckpointFormProps extends React.HTMLAttributes {
  checkpointId?: number;
  edit?: boolean;
}

const getButtonText = (submitting: boolean, edit: boolean) => {
  if (edit) {
    return submitting ? 'Saving' : 'Save';
  } else {
    return submitting ? 'Creating' : 'Create';
  }
};

export class CheckpointForm extends React.Component<CheckpointFormProps, {}> {
  componentDidMount() {
    const { initialValues, initialize } = this.props;
    if (initialValues) {
      initialize(initialValues);
    }
  }

  render() {
    const { className, submitting, edit } = this.props;
    const other = _.omit(this.props, 'className', 'edit');
    const buttonText = getButtonText(submitting, edit);
    const cssClass = classnames('CheckpointForm', className);
    return (
      <Form className={cssClass} {...other}>
        <InputField label="Title" name="title" />
        <TextAreaField label="Description" name="description" />
        <CheckboxField label="Private" name="private" />
        <FormButtons>
          <Button type="submit" primary>{buttonText}</Button>
        </FormButtons>
      </Form>
    );
  }
}

const CheckpointReduxForm = reduxForm({
  form: 'CheckpointForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Forms.Checkpoint, dispatch) => {
    return addCheckpoint(values)
      .then(() => {
        dispatch(reset('CheckpointForm'));
        dispatch(getCheckpoints());
      })
      .catch(err => new SubmissionError({ _error: err }));
  }
})(CheckpointForm);

export default CheckpointReduxForm;

const EditCheckpointReduxForm = reduxForm({
  form: 'EditCheckpointForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Forms.Checkpoint, dispatch) => {
    return editCheckpoint(values)
      .then(() => {
        dispatch(reset('EditCheckpointForm'));
        dispatch(getCheckpoint(values.id));
      })
      .catch(err => new SubmissionError({ _error: err }));
  },
  edit: true
} as any)(CheckpointForm);

const mapStateToProps = (state: Checkpoints.State, ownProps) => {
  const checkpoint = state.checkpoints.find(c => c.id == ownProps.checkpointId);
  return {
    initialValues: {
      id: checkpoint.id,
      title: checkpoint.title,
      description: checkpoint.description,
      private: checkpoint.isPrivate
    }
  };
};

export const EditCheckpointForm = connect(mapStateToProps)(EditCheckpointReduxForm);