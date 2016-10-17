import * as React from 'react';
import {connect} from 'react-redux';
import { toggleOneCheckpoint } from '../actions/checkpoints'

interface Props {
  item: Checkpoints.Checkpoint;
  toggleChecked: () => void;
}

export class CheckpointItem extends React.Component<Props, {}> {
  onChanged = () => {
    this.props.toggleChecked();
    // console.log("haha");
    // var item = this.state.item;
    // item.isCompleted = !item.isCompleted;
    // this.setState({item: item});
  }

  render(){
    return (
      <div>
        <input type="checkbox" defaultChecked={this.props.item.isCompleted} onChange={this.onChanged.bind(this)} />
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
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleChecked: () => {
      dispatch(toggleOneCheckpoint(ownProps.item));
    }
  };
}


export const CheckpointItemContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointItem);
