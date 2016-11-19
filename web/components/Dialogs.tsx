import './Dialogs.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import IconButton from './IconButton';
import { MaterialIcon } from './Icon';

import { closeDialog, DialogOptions } from '../actions/dialog';
import { showOverlay, hideOverlay, OverlayOptions } from '../actions/overlay';

interface DialogsProps {
  dialogs?: DialogOptions[];
}

interface DialogProps extends React.HTMLAttributes {
  options?: DialogOptions;
  onOpen?: (node: Element) => void;
  onClose?: () => void;
  onDestroy?: () => void;
}

const DURATION = 300;

class Dialog extends React.Component<DialogProps, {}> {
  element: HTMLDivElement;

  componentDidMount() {
    this.props.onOpen(this.element);
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { options } = this.props;
    const cssClass = classnames('Dialog', `Dialog--${options.size}`);
    return (
      <div className={cssClass} ref={e => this.element = e}>
        <div className="Dialog-title">
          <h1>{options.title}</h1>
          <IconButton onClick={this.handleClose} tabIndex={-1}><MaterialIcon icon="close" /></IconButton>
        </div>
        <div className="Dialog-content">
          {options.node}
        </div>
      </div>
    );
  }
}

const DialogContainer = connect(
  state => { return {}; },
  (dispatch, ownProps: DialogProps) => {
    return {
      onOpen: (node: Element) => {
        dispatch(showOverlay(node, Object.assign({}, ownProps.options, {
          onClose: () => {
            dispatch(closeDialog());
            ownProps.options.onClose();
          }
        })));
      },
      onClose: () => {
        dispatch(closeDialog());
        dispatch(hideOverlay());
      },
      onDestroy: () => {
        dispatch(hideOverlay());
      }
    };
  }
)(Dialog);

class Dialogs extends React.Component<DialogsProps, {}> {
  render() {
    const { dialogs } = this.props;
    const cssClass = classnames('Dialogs', {
      'Dialogs--active': !!dialogs.length
    });
    return (
      <div className={cssClass}>
        <ReactCSSTransitionGroup
          transitionName="dialog"
          transitionEnter={true}
          transitionEnterTimeout={DURATION}
          transitionLeave={true}
          transitionLeaveTimeout={DURATION}
        >
          {
            dialogs.map((dialog, i) => <DialogContainer key={i} options={dialog} />)
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dialogs: state.dialog
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
}

const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialogs);

export default DialogsContainer;