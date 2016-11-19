import './ConfirmDialog.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Button from './Button';

import { closeDialog } from '../actions/dialog';

interface Props {
  yesText?: string;
  noText?: string;
  onSubmit: (result: boolean) => void;
  onClose?: () => void;
}

class ConfirmDialog extends React.Component<Props, {}> {
  static defaultProps: Props = {
    yesText: 'Yes',
    noText: 'Cancel',
    onSubmit: () => {}
  };

  handleSubmit = (result: boolean) => {
    this.props.onSubmit(result);
    this.props.onClose();
  };

  render() {
    const { children, yesText, noText, onSubmit } = this.props;
    return (
      <div className="ConfirmDialog">
        <div className="ConfirmDialog-content">{React.Children.count(children) ? children : 'Are you sure?'}</div>
        <div className="ConfirmDialog-buttons">
          <Button onClick={() => this.handleSubmit(false)}>{noText}</Button>
          <Button onClick={() => this.handleSubmit(true)} primary>{yesText}</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  return {
    onClose: () => {
      dispatch(closeDialog());
    }
  }
};

const ConfirmDialogContainer = connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);
export default ConfirmDialogContainer;
