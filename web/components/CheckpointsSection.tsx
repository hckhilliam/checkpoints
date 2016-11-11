import './CheckpointsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import CheckpointForm from './CheckpointForm';
import { List, ExpandableListItem } from './List';

import { getCheckpoints, getCheckpoint } from '../actions/checkpoints';

interface Props {
  checkpoints?: Checkpoints.Checkpoint[];
  onComponentDidMount?: () => void;
  onSelectCheckpoint?: (checkpoint: Checkpoints.Checkpoint) => void;
}

interface State {
  checkpoint?: Checkpoints.Checkpoint;
}

export class CheckpointsSection extends React.Component<Props, State> {
  static defaultProps: Props = {
    onComponentDidMount: () => {},
    onSelectCheckpoint: () => {}
  }

  state: State = {
    checkpoint: {} as Checkpoints.Checkpoint
  }

  componentDidMount() {
    this.props.onComponentDidMount();
  }

  handleSelectCheckpoint(checkpoint: Checkpoints.Checkpoint) {
    this.setState({ checkpoint });
    this.props.onSelectCheckpoint(checkpoint);
  }

  render() {
    const { checkpoints } = this.props;
    const { checkpoint } = this.state;

    return (
      <div className="CheckpointsSection">
        <Panel className="CheckpointsSection-form">
          <h1>Create a Checkpoint</h1>
          <CheckpointForm />
        </Panel>
        <Panel className="CheckpointsSection-list">
          <h1>My Checkpoints</h1>
        </Panel>
        <List>
          {
            checkpoints.filter(c => !c.isCompleted).map(c => {
              return (
                <ExpandableListItem
                  key={c.id}
                  selected={c.id == checkpoint.id}
                  onClick={() => this.handleSelectCheckpoint(c)}
                >
                  {c.title} — {c.description}
                </ExpandableListItem>
              );
            })
          }
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkpoints: state.checkpoints
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => {
      dispatch(getCheckpoints());
    },
    onSelectCheckpoint: (checkpoint: Checkpoints.Checkpoint) => {
      dispatch(getCheckpoint(checkpoint.id));
    }
  };
}

const CheckpointsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsSection);
export default CheckpointsSectionContainer;