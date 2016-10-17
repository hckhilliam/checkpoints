import * as React from 'react'
import { connect } from 'react-redux';
import CheckpointsList from './CheckpointsList';
import { getCheckpoints } from '../actions/checkpoints';
import './CheckpointsMain.scss';

interface Props {
  checkListItems: Checkpoints.Checkpoint[];
  onGetCheckpoints: () => void;
}

export default class CheckpointsMain extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.onGetCheckpoints();
  }

  render() {
    const props = this.props;
    const finished = props.checkListItems.filter((element) => element.isCompleted);
    const unfinished = props.checkListItems.filter((element) => !element.isCompleted);
    return (
      <div>
        <h1 >Bucket List</h1>
        <CheckpointsList title="Finished" list={finished} />
        <CheckpointsList title="Unfinished" list={unfinished} />
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
    }
  }
};

export const CheckpointsMainContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsMain);