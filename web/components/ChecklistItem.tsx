import * as React from 'react';
//
interface Props {
  item
}

export class ChecklistItem extends React.Component<Props, {}> {

  render() {
    let { item }  = this.props.item;

    // this.setState({item: item});
    let toggle = function(){
      console.log("haha");
      // var item = this.state.item;
      // item.completed = !item.completed;
      // this.setState({item: item});
    }
    return (
      <div>
        <input type="checkbox" checked={this.props.item.completed} onClick={toggle}/>
        {this.props.item.description}
      </div>
    );
  }
}

export default ChecklistItem;
