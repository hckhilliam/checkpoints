import * as React from 'react'

interface Props {
  item: Checkpoints.Checkpoint
}

export class CheckpointItem extends React.Component<Props, {}> {
  toggle() {
    console.log("haha");
    // var item = this.state.item;
    // item.isCompleted = !item.isCompleted;
    // this.setState({item: item});
  }

  render(){
    return (
      <div>
        <input type="checkbox" checked={this.props.item.isCompleted} onClick={this.toggle.bind(this)} />
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

export default CheckpointItem;