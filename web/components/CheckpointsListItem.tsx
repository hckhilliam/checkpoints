import './CheckpointsListItem.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { ExpandableListItem } from './List';
import Checkpoint from './Checkpoint';
import { MaterialIcon } from './Icon';

interface Props extends React.HTMLAttributes {
  checkpoint: Checkpoints.Checkpoint;
  selected: boolean;
}

export default class CheckpointsListItem extends React.Component<Props, {}> {
  render() {
    const { className, checkpoint, selected } = this.props;

    const other = _.omit(this.props, 'className', 'checkpoint', 'selected');
    const cssClass = classnames('CheckpointsListItem', className);

    return (
      <ExpandableListItem
        className={cssClass}
        selected={selected}
        loading={selected && !checkpoint.loaded}
        expanded={checkpoint.loaded}
        body={<Checkpoint checkpoint={checkpoint} />}
        {...other}
      >
        <div className="CheckpointsListItem-wrapper">
          <div className="CheckpointsListItem-text">
            <span className="CheckpointsListItem-title">{checkpoint.title}</span>
            <span className="CheckpointsListItem-divider">—</span>
            <span>{checkpoint.description}</span>
          </div>
          <div className="CheckpointsListItem-icons">
            {checkpoint.isPrivate ? <MaterialIcon icon="visibility_off" /> : null}
            {checkpoint.isCompleted ? <MaterialIcon className="CheckpointsListItem-completed" icon="check_circle" /> : null}
          </div>
        </div>
      </ExpandableListItem>
    );
  }
}
