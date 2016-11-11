import './CheckpointForm.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, FormProps, SubmissionError } from 'redux-form';
import * as classnames from 'classnames';

import { InputField, TextAreaField } from './Input';
import Button from './Button';
import FormMessage from './FormMessage';

import { addCheckpoint, validate } from '../lib/forms/checkpoint';
import { getCheckpoints } from '../actions/checkpoints';

interface Props extends FormProps<Checkpoints.Forms.Checkpoint, {}> {
  className?: string;
  onSubmitSuccess?: () => void;
}

export class CheckpointForm extends React.Component<Props, {}> {
  static defaultProps: Props = {
    onSubmitSuccess: () => {}
  }

  handleSubmit = (values: Checkpoints.Forms.Checkpoint) => {
    return addCheckpoint(values)
      .then(() => {
        this.props.reset();
        this.props.onSubmitSuccess();
      })
      .catch(err => new SubmissionError({ _error: err }));
  }

  render() {
    const { className, handleSubmit, pristine, invalid, submitting, error } = this.props;
    const disabled = pristine || invalid || submitting;

    const cssClass = classnames('CheckpointForm', className);

    return (
      <form className={className} onSubmit={handleSubmit(this.handleSubmit)} autoComplete="off">
        <InputField label="Title" name="title" />
        <TextAreaField label="Description" name="description" />
        <div className="CheckpointForm-buttons">
          <Button className="CheckpointForm-button" type="submit" primary disabled={disabled}>
            {submitting ? 'Creating' : 'Create'}
          </Button>
        </div>
        <FormMessage type="Error">{(!submitting && error) ? error : null}</FormMessage>
      </form>
    )
  }
}

const CheckpointsReduxForm = reduxForm({
  form: 'CheckpointForm',
  validate: validate as any
})(CheckpointForm);

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  return {
    onSubmitSuccess: () => {
      dispatch(getCheckpoints());
      const { onSubmitSuccess } = ownProps;
      onSubmitSuccess && onSubmitSuccess();
    }
  }
}

const CheckpointsFormContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsReduxForm);

export default CheckpointsFormContainer;
