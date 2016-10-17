import * as React from 'react'
import { connect } from 'react-redux';
import CheckpointsList from './CheckpointsList';
import { getCheckpoints, addCheckpoint } from '../actions/checkpoints';

import './CheckpointsMain.scss';

interface Props {
  checkListItems: Checkpoints.Checkpoint[];
  onGetCheckpoints: () => void;
  onAddCheckpoint: (checkpoint) => void;
}

interface State {
  checkpointTitle: string
}

export default class CheckpointsMain extends React.Component<Props, State> {

  state: State = {
    checkpointTitle: ''
  }

  componentDidMount() {
    this.props.onGetCheckpoints();
  }

  editNewCheckpoint = (event) => {
    this.setState({checkpointTitle: event.target.value });
  }

  addCheckpoint = () => {
    let checkpoint = {title: this.state.checkpointTitle};
    console.log(this.state);
    this.props.onAddCheckpoint(checkpoint);
  }

  render() {
    const { checkListItems } = this.props;
    const finished = checkListItems.filter((element) => element.isCompleted);
    const unfinished = checkListItems.filter((element) => !element.isCompleted);
    return (
      <div>
        <h1>Bucket List</h1>

        <div>
          <input type="text" value={this.state.checkpointTitle} onChange={this.editNewCheckpoint}/>
          <button onClick={this.addCheckpoint}>Add</button>
        </div>

        <CheckpointsList title="Unfinished" list={unfinished} />
        <CheckpointsList title="Finished" list={finished} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkListItems: state.checkpoints
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCheckpoints: () => {
      dispatch(getCheckpoints());
    },
    onAddCheckpoint: (checkpoint) => {
      dispatch(addCheckpoint(checkpoint));
    }
  }
};

export const CheckpointsMainContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsMain);
