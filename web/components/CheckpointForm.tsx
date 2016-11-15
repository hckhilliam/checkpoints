import './CheckpointForm.scss';

import * as React from 'react';
import { reduxForm, SubmissionError, reset } from 'redux-form';
import * as classnames from 'classnames';

import Form from './Form';
import { InputField, TextAreaField } from './Input';
import Button from './Button';
import { CheckboxField } from './Checkbox';
import FormButtons from './FormButtons';

import { addCheckpoint, validate } from '../lib/forms/checkpoint';
import { getCheckpoints } from '../actions/checkpoints';

export class CheckpointForm extends React.Component<React.HTMLAttributes, {}> {
  render() {
    const { className, submitting } = this.props;
    const other = _.omit(this.props, className);
    const buttonText = submitting ? 'Creating' : 'Create';
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

const CheckpointsReduxForm = reduxForm({
  form: 'CheckpointForm',
  validate: validate as any,
  onSubmit: (values: Checkpoints.Forms.Checkpoint, dispatch) => {
    console.log(values);
    return addCheckpoint(values)
      .then(() => {
        dispatch(reset('CheckpointForm'));
        dispatch(getCheckpoints());
      })
      .catch(err => new SubmissionError({ _error: err }));
  }
})(CheckpointForm);

export default CheckpointsReduxForm;
