import './CheckpointsSection.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import Panel from './Panel';
import CheckpointForm from './CheckpointForm';
import CheckpointsList from './CheckpointsList';
import Button from './Button';
import IconButton from './IconButton';
import { MaterialIcon } from './Icon';

interface Props {

}

interface State {
  add?: boolean;
}

export class CheckpointsSection extends React.Component<Props, State> {
  static defaultProps: Props = {

  };

  state: State = {
    add: false
  };

  render() {
    const cssClass = classnames('CheckpointsSection', {
      'CheckpointsSection--add': this.state.add
    });
    return (
      <div className={cssClass}>
        <div className="CheckpointsSection-header">
          <Panel className="CheckpointsSection-title">
            <h1>My Checkpoints</h1>
            <Button onClick={() => this.setState({ add: true })} primary>New Checkpoint</Button>
          </Panel>
          <Panel className="CheckpointsSection-form">
            <div className="CheckpointsSection-form-title">
              <h1>Create a Checkpoint</h1>
              <IconButton onClick={() => this.setState({ add: false })}><MaterialIcon icon="close" /></IconButton>
            </div>
            <CheckpointForm onSubmitSuccess={() => this.setState({ add: false })} />
          </Panel>
        </div>
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