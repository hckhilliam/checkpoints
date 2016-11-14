import './CheckpointsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import Checkpoint from './Checkpoint';
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
  };

  state: State = {
    checkpoint: {} as Checkpoints.Checkpoint
  };

  componentDidMount() {
    this.props.onComponentDidMount();
  }

  componentWillReceiveProps(nextProps: Props) {
    const checkpoints = this.props.checkpoints;
    const newCheckpoints = nextProps.checkpoints;
    const { checkpoint } = this.state;

    // Unselect if selected checkpoint unloaded
    if (checkpoint && checkpoints != newCheckpoints) {
      const c1 = checkpoints.find(c => c.id == checkpoint.id);
      const c2 = newCheckpoints.find(c => c.id == checkpoint.id);
      if (!c2 || (c1.loaded && !c2.loaded))
        this.setState({ checkpoint: {} as Checkpoints.Checkpoint });
    }
  }

  handleSelectCheckpoint(checkpoint: Checkpoints.Checkpoint) {
    const c = this.state.checkpoint;
    if (c && c.id == checkpoint.id) {
      this.setState({ checkpoint: {} as Checkpoints.Checkpoint });
    } else {
      this.setState({ checkpoint });
      this.props.onSelectCheckpoint(checkpoint);
    }
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
              const selected = c.id == checkpoint.id;
              return (
                <ExpandableListItem
                  key={c.id}
                  selected={selected}
                  loading={selected && !c.loaded}
                  expanded={c.loaded}
                  body={<Checkpoint checkpoint={c} />}
                  onClick={() => this.handleSelectCheckpoint(c)}
                >
                  <span style={{ fontWeight: 500 }}>{c.title}</span> — {c.description}
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
};

const mapDispatchToProps = dispatch => {
  return {
    onComponentDidMount: () => {
      dispatch(getCheckpoints());
    },
    onSelectCheckpoint: (checkpoint: Checkpoints.Checkpoint) => {
      dispatch(getCheckpoint(checkpoint.id));
    }
  };
};

const CheckpointsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsSection);
export default CheckpointsSectionContainer;