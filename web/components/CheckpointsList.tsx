import './CheckpointsList.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { List } from './List';
import CheckpointsListItem from './CheckpointsListItem';

import { getCheckpoints, getCheckpoint } from '../actions/checkpoints';

interface Props extends React.HTMLAttributes {
  checkpoints?: Checkpoints.Checkpoint[];
  onComponentDidMount?: () => void;
  onSelectCheckpoint?: (checkpoint: Checkpoints.Checkpoint) => void;
}

interface State {
  checkpoint?: Checkpoints.Checkpoint;
}

interface CheckpointsListSectionProps {
  title: string;
  checkpoints: Checkpoints.Checkpoint[];
  selectedId: number;
  onClick: (checkpoint: Checkpoints.Checkpoint) => void;
}

const CheckpointsListSection = (props: CheckpointsListSectionProps) => {
  const { title, checkpoints, selectedId, onClick } = props;
  return (
    <div className="CheckpointsListSection">
      <h2>{title}</h2>
      {
        checkpoints.map(c => {
          const selected = c.id == selectedId;
          return (
            <CheckpointsListItem
              key={c.id}
              checkpoint={c}
              selected={selected}
              onClick={() => onClick(c)}
            />
          );
        })
      }
    </div>
  );
};

export class CheckpointsList extends React.Component<Props, State> {
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

  handleSelectCheckpoint = (checkpoint: Checkpoints.Checkpoint) => {
    const c = this.state.checkpoint;
    if (c && c.id == checkpoint.id) {
      this.setState({ checkpoint: {} as Checkpoints.Checkpoint });
    } else {
      this.setState({ checkpoint });
      this.props.onSelectCheckpoint(checkpoint);
    }
  };

  render() {
    const { className, checkpoints } = this.props;
    const { checkpoint } = this.state;

    const other = _.omit(this.props, 'className', 'checkpoints', 'onComponentDidMount', 'onSelectCheckpoint');

    const cssClass = classnames('CheckpointsList', className);

    const pending = checkpoints.filter(c => !c.isCompleted);
    const complete = checkpoints.filter(c => c.isCompleted);

    return (
      <List className={cssClass} {...other}>
        {
          pending.length
            ? <CheckpointsListSection
                title="In Progress"
                checkpoints={pending}
                selectedId={checkpoint.id}
                onClick={this.handleSelectCheckpoint}
              />
            : null
        }
        {
          complete.length
            ? <CheckpointsListSection
                title="Complete"
                checkpoints={complete}
                selectedId={checkpoint.id}
                onClick={this.handleSelectCheckpoint}
              />
            : null
        }
      </List>
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

const CheckpointsListContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsList);
export default CheckpointsListContainer;
