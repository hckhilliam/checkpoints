import * as React from 'react';
import { reduxForm, FormProps, SubmissionError } from 'redux-form';
import * as classnames from 'classnames';

import { TextAreaField } from './Input';

interface Props extends FormProps<{}, {}> {
  onSubmitSuccess?: () => void;
}

export class CheckpointsForm extends React.Component<Props, {}> {
  static defaultProps: Props = {
    onSubmitSuccess: () => {}
  }

  render() {
    const { handleSubmit, pristine, invalid, submitting, error } = this.props;
    const disabled = pristine || invalid || submitting;

    return (
      <form className="CheckpointsForm" onSubmit={handleSubmit} autoComplete="off">
        <TextAreaField label="Description" name="description" />
      </form>
    )
  }
}

const CheckpointsReduxForm = reduxForm({
  form: 'CheckpointsForm',
  onSubmit: (values: Checkpoints.Forms.Checkpoint) => {
    return Promise.resolve();
  }
})(CheckpointsForm);
export default CheckpointsReduxForm;
