import './Checkpoint.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { EditCheckpointForm } from './CheckpointForm';
import Button from './Button';
import IconButton from './IconButton';
import { MaterialIcon } from './Icon';

import { completeCheckpoint } from '../actions/checkpoints';

interface Props extends React.HTMLAttributes {
  checkpoint: Checkpoints.Checkpoint;
  onEdit?: () => void;
  onComplete?: () => void;
}

interface State {
  edit?: boolean;
}

const CheckpointStatus = ({ complete }: { complete: boolean }) => {
  const cssClass = classnames('CheckpointStatus', {
    'CheckpointStatus--complete': complete
  });
  return (
    <div className={cssClass}>
      <div className="CheckpointStatus-text">{complete ? 'Complete' : 'In Progress'}</div>
    </div>
  );
};

export class Checkpoint extends React.Component<Props, State> {
  state: State = {
    edit: false
  };

  showEdit = () => {
    this.setState({ edit: true });
  };

  hideEdit = () => {
    this.setState({ edit: false });
  };

  render() {
    const { className, checkpoint, onEdit, onComplete } = this.props;
    const other = _.omit(this.props, 'className', 'checkpoint', 'onEdit', 'onComplete');

    const complete = checkpoint.isCompleted;
    const visibility = checkpoint.isPrivate ? 'Private' : 'Public';

    const { edit } = this.state;

    const cssClass = classnames('Checkpoint', className, {
      'Checkpoint--complete': complete,
      'Checkpoint--edit': edit
    });

    return (
      <div className={cssClass} {...other}>
        <div className="Checkpoint-title">
          <h1>{checkpoint.title}</h1>
          <IconButton onClick={this.showEdit} tabIndex={-1}><MaterialIcon icon="edit" /></IconButton>
          <CheckpointStatus complete={complete} />
        </div>
        <div className="Checkpoint-description">
          <h3>Description</h3>
          <span>{checkpoint.description}</span>
        </div>
        <div className="Checkpoint-visibility">
          <h3>Visibility</h3>
          <span>{visibility}</span>
        </div>
        <div className="Checkpoint-form">
          <div className="Checkpoint-form-header">
            <h1>Edit Checkpoint</h1>
            <IconButton onClick={this.hideEdit} tabIndex={-1}><MaterialIcon icon="close" /></IconButton>
          </div>
          <EditCheckpointForm checkpointId={checkpoint.id} />
        </div>
        {
          complete
            ? null
            : (
                <div className="Checkpoint-buttons">
                  <Button onClick={onComplete} raised primary tabIndex={-1}>Mark as complete</Button>
                </div>
              )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  return {
    onEdit: () => {},
    onComplete: () => {
      dispatch(completeCheckpoint(ownProps.checkpoint.id));
    }
  };
};

const CheckpointContainer = connect(mapStateToProps, mapDispatchToProps)(Checkpoint);
export default CheckpointContainer;