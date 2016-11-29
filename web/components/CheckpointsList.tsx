import './CheckpointsList.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { List, ListProps } from './List';
import CheckpointsListItem from './CheckpointsListItem';

import { getCheckpoints, getCheckpoint } from '../actions/checkpoints';

interface Props extends ListProps {
  userId?: number;
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
  privateView: boolean;
  onClick: (checkpoint: Checkpoints.Checkpoint) => void;
}

const CheckpointsListSection = (props: CheckpointsListSectionProps) => {
  const { title, checkpoints, selectedId, privateView, onClick } = props;
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
              privateView={privateView}
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
    checkpoints: [],
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
    const { className, checkpoints, userId } = this.props;
    const { checkpoint } = this.state;

    const other = _.omit(this.props, 'className', 'userId', 'checkpoints', 'onComponentDidMount', 'onSelectCheckpoint');

    const cssClass = classnames('CheckpointsList', className);

    const pending = checkpoints.filter(c => !c.isCompleted);
    const complete = checkpoints.filter(c => c.isCompleted);

    return (
      <List className={cssClass} {...other}>
        {
          !!pending.length &&
            <CheckpointsListSection
              title="In Progress"
              checkpoints={pending}
              selectedId={checkpoint.id}
              privateView={!userId}
              onClick={this.handleSelectCheckpoint}
            />
        }
        {
          !!complete.length &&
            <CheckpointsListSection
              title="Complete"
              checkpoints={complete}
              selectedId={checkpoint.id}
              privateView={!userId}
              onClick={this.handleSelectCheckpoint}
            />
        }
        {
          !pending.length && !complete.length && <h3 className="CheckpointsList-no-items">Looks like you don't have any checkpoints yet!</h3>
        }
      </List>
    );
  }
}

const mapStateToProps = (state: Checkpoints.State, ownProps: Props) => {
  const { userId } = ownProps;
  return {
    checkpoints: userId
      ? state.checkpoints.users[userId]
      : state.checkpoints.me
  };
};

const mapDispatchToProps = (dispatch, ownProps: Props) => {
  const { userId } = ownProps;
  return {
    onComponentDidMount: () => {
      dispatch(getCheckpoints(userId));
    },
    onSelectCheckpoint: (checkpoint: Checkpoints.Checkpoint) => {
      dispatch(getCheckpoint(checkpoint.id, userId));
    }
  };
};

const CheckpointsListContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsList);
export default CheckpointsListContainer;
