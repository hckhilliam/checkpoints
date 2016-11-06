import * as React from 'react';

interface Props {
  checkpoint: Checkpoints.Checkpoint;
  clickYes: () => void;
  clickCancel: () => void;
}

export default class OnCompleteDialog extends React.Component<Props, {}> {
  onYes() {
    this.props.clickYes();
  }

  onCancel() {
    this.props.clickCancel();
  }

  render() {
    let checkpoint = this.props.checkpoint;

    if (checkpoint.isCompleted) {
      var message = 'are you sure want to change checkpoint, \'' + checkpoint.title + '\', to uncompleted';
    }
    else {
      var message = 'are you sure want to change checkpoint, \'' + checkpoint.title + '\', to uncompleted';
    }
    return (
      <div>
        {message}
        <input type="button" value="Yes" onClick={this.onYes} />
        <input type="button" value="Cancel" onClick={this.onCancel} />
      </div>
    );
  }
}