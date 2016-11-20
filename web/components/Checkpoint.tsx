import './Checkpoint.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { EditCheckpointForm } from './CheckpointForm';
import Button from './Button';
import IconButton from './IconButton';
import { MaterialIcon } from './Icon';
import ConfirmDialog from './ConfirmDialog';
import ImageUpload from './ImageUpload';
import Picture from './Picture';
import FacebookShareButton from './FacebookShareButton';

import { completeCheckpoint, deleteCheckpoint, addCheckpointImages } from '../actions/checkpoints';
import { openDialog, closeDialog } from '../actions/dialog';

interface Props extends React.HTMLAttributes {
  checkpoint: Checkpoints.Checkpoint;
  privateView?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  onUpload?: (images: Checkpoints.Picture[]) => void;
}

interface State {

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

  };

  render() {
    const { className, checkpoint, privateView, onEdit, onDelete, onComplete, onUpload } = this.props;
    const other = _.omit(this.props, 'className', 'checkpoint', 'privateView', 'onEdit', 'onDelete', 'onComplete', 'onUpload');

    const complete = checkpoint.isCompleted;
    const visibility = checkpoint.isPrivate ? 'Private' : 'Public';

    const cssClass = classnames('Checkpoint', className, {
      'Checkpoint--complete': complete
    });

    return (
      <div className={cssClass} {...other}>
        <div className="Checkpoint-title">
          <h1>{checkpoint.title}</h1>
          {!complete && privateView && <IconButton className="Checkpoint-edit" onClick={onEdit} tabIndex={-1}><MaterialIcon icon="edit" /></IconButton>}
          {privateView && <IconButton className="Checkpoint-delete" onClick={onDelete} tabIndex={-1}><MaterialIcon icon="delete" /></IconButton>}
          <CheckpointStatus complete={complete} />
        </div>
        <div className="Checkpoint-description">
          <h3>Description</h3>
          <span>{checkpoint.description}</span>
        </div>
        {privateView &&
          <div className="Checkpoint-visibility">
            <h3>Visibility</h3>
            <span>{visibility}</span>
          </div>
        }
        <div className="Checkpoint-photos">
          <h3>Photos</h3>
          <div className="Checkpoints-photos-row row">
            {
              checkpoint.pictures &&
              checkpoint.pictures.map(picture => <Picture className="col-xs-6 col-sm-3 col-md-4 col-lg-2" key={picture.url} picture={picture} />)
            }
          </div>
          {privateView && <ImageUpload onUpload={onUpload} />}
        </div>
        {privateView &&
          <div className="Checkpoint-buttons">
            <FacebookShareButton url="google.com" />
            {!complete && <Button onClick={onComplete} raised primary tabIndex={-1}>Mark as complete</Button>}
          </div>
        }
      </div>
    );
  }
}

const EditForm = (props: { checkpointId: number, onSubmitSuccess: () => void }) => {
  return (
    <div className="CheckpointEditForm">
      <EditCheckpointForm checkpointId={props.checkpointId} onSubmitSuccess={props.onSubmitSuccess} />
    </div>
  )
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  return {
    onEdit: () => {
      const callback = () => dispatch(closeDialog());
      dispatch(openDialog(
        <EditForm checkpointId={ownProps.checkpoint.id} onSubmitSuccess={callback} />,
        { title: 'Edit Checkpoint' }
      ));
    },
    onDelete: () => {
      const onSubmit = (result: boolean) => {
        result && dispatch(deleteCheckpoint(ownProps.checkpoint.id));
      };
      dispatch(openDialog(
        <ConfirmDialog onSubmit={onSubmit}>
          Are you sure you want to delete your checkpoint? <strong>(It'll be gone forever!)</strong>
        </ConfirmDialog>,
        { title: 'Delete Checkpoint?', size: 'Small' }
      ));
    },
    onComplete: () => {
      dispatch(completeCheckpoint(ownProps.checkpoint.id));
    },
    onUpload: (images: Checkpoints.Picture[]) => {
      dispatch(addCheckpointImages(ownProps.checkpoint.id, images));
    }
  };
};

const CheckpointContainer = connect(mapStateToProps, mapDispatchToProps)(Checkpoint);
export default CheckpointContainer;