import './Checkpoint.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface Props extends React.HTMLAttributes {
  checkpoint: Checkpoints.Checkpoint;
}

export default class Checkpoint extends React.Component<Props, {}> {
  render() {
    const { className, checkpoint } = this.props;
    const other = _.omit(this.props, 'className', 'checkpoint');
    const cssClass = classnames('Checkpoint', className);
    return (
      <div className={cssClass} {...other}>
        <h1>{checkpoint.title}</h1>
        <p>{checkpoint.description}</p>
      </div>
    );
  }
}