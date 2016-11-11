import './CheckpointsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import CheckpointForm from './CheckpointForm';
import { List, SelectableListItem } from './List';

import { getCheckpoints } from '../actions/checkpoints';

interface Props {
  checkpoints?: Checkpoints.Checkpoint[];
  onComponentDidMount?: () => void;
}

export class CheckpointsSection extends React.Component<Props, {}> {
  static defaultProps: Props = {
    onComponentDidMount: () => {}
  }

  componentDidMount() {
    this.props.onComponentDidMount();
  }

  render() {
    const { checkpoints } = this.props;
    return (
      <div className="CheckpointsSection">
        <Panel className="CheckpointsSection-form">
          <h1>Create a Checkpoint</h1>
          <CheckpointForm />
        </Panel>
        <Panel className="CheckpointsSection-list">
          <h1>Checkpoints</h1>
          <List>
            {
              checkpoints.filter(c => !c.isCompleted).map(checkpoint => {
                return <SelectableListItem>{checkpoint.title} — {checkpoint.description}</SelectableListItem>
              })
            }
          </List>
        </Panel>
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
    }
  };
}

const CheckpointsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsSection);
export default CheckpointsSectionContainer;