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

import { showOverlay, hideOverlay } from '../actions/overlay';

interface Props {
  onRequestShowOverlay?: (ref: any, onClose: () => void) => void;
  onRequestHideOverlay?: () => void;
}

interface State {
  add?: boolean;
}

export class CheckpointsSection extends React.Component<Props, State> {
  static defaultProps: Props = {

  };

  node: HTMLElement;

  state: State = {
    add: false
  };

  showAddForm = () => {
    this.setState({ add: true });
    this.props.onRequestShowOverlay(this.node, () => this.setState({ add: false }));
  };

  hideAddForm = () => {
    this.setState({ add: false });
    this.props.onRequestHideOverlay();
  };

  render() {
    const cssClass = classnames('CheckpointsSection', {
      'CheckpointsSection--add': this.state.add
    });
    return (
      <div className={cssClass}>
        <div className="CheckpointsSection-header" ref={n => (n ? this.node = n : null)}>
          <Panel className="CheckpointsSection-title">
            <h1>My Checkpoints</h1>
            <Button onClick={this.showAddForm} primary>New Checkpoint</Button>
          </Panel>
          <Panel className="CheckpointsSection-form">
            <div className="CheckpointsSection-form-title">
              <h1>Create a Checkpoint</h1>
              <IconButton onClick={this.hideAddForm}><MaterialIcon icon="close" /></IconButton>
            </div>
            <CheckpointForm onSubmitSuccess={this.hideAddForm} />
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
    onRequestShowOverlay: (ref: any, onClose: () => void) => {
      dispatch(showOverlay(ref, {
        onClose
      }));
    },
    onRequestHideOverlay: () => {
      dispatch(hideOverlay());
    }
  };
};

const CheckpointsSectionContainer = connect(mapStateToProps, mapDispatchToProps)(CheckpointsSection);
export default CheckpointsSectionContainer;
