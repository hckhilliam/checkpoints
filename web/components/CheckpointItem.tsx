import * as React from 'react';
import { connect } from 'react-redux';
import { saveCheckpoint } from '../actions/checkpoints';

interface Props {
  item?: Checkpoints.Checkpoint;
  onToggle?: () => void;
}

export class CheckpointItem extends React.Component<Props, {}> {
  handleChange = () => {
    this.props.onToggle();
  };

  render() {
    return (
      <div>
        <input type="checkbox" defaultChecked={this.props.item.isCompleted} onChange={() => this.handleChange()} />
        {this.props.item.id}
        {this.props.item.title}
        {this.props.item.description}
        {this.props.item.isPrivate}
        {this.props.item.comments}
        {this.props.item.pictures}
        {this.props.item.isCompleted}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggle: () => {
      const checkpoint = Object.assign({}, ownProps.item, {
        isCompleted: !ownProps.item.isCompleted
      });
      dispatch(saveCheckpoint(checkpoint));
    }
  };
};

export const CheckpointItemContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointItem);
