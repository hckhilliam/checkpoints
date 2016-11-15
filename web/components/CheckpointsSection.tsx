import './CheckpointsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import Panel from './Panel';
import CheckpointForm from './CheckpointForm';
import CheckpointsList from './CheckpointsList';

interface Props {

}

interface State {

}

export class CheckpointsSection extends React.Component<Props, State> {
  static defaultProps: Props = {

  };

  render() {
    return (
      <div className="CheckpointsSection">
        <Panel className="CheckpointsSection-form">
          <h1>Create a Checkpoint</h1>
          <CheckpointForm />
        </Panel>
        <Panel className="CheckpointsSection-list">
          <h1>My Checkpoints</h1>
        </Panel>
        <CheckpointsList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

const CheckpointsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsSection);
export default CheckpointsSectionContainer;