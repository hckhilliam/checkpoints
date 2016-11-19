import './Overlay.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { hideOverlay, OverlayOptions } from '../actions/overlay';

interface OverlayProps {
  overlays?: OverlayOptions[];
  onRequestClose?: () => void;
}

interface OverlayElementProps {
  options: OverlayOptions;
  zIndex: number;
}

const DURATION = 200;

const Overlay = (props: OverlayElementProps) => {
  const { options, zIndex } = props;
  const cssClass = classnames('Overlay', {
    'Overlay--opaque': options.opaque
  });
  return (
    <div className={cssClass} style={{ zIndex }} />
  );
};

class Overlays extends React.Component<OverlayProps, {}> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  componentWillReceiveProps(nextProps: OverlayProps) {
    if (nextProps.overlays != this.props.overlays) {
      nextProps.overlays.forEach((overlay, i) => {
        if (overlay.node) {
          const node = ReactDOM.findDOMNode(overlay.node) as HTMLElement;
          node.style.zIndex = (5000 + i * 2 + 1).toString();
        }
      });
      const difference = _.difference(this.props.overlays, nextProps.overlays);
      difference.forEach(overlay => {
        if (overlay.node) {
          const node = ReactDOM.findDOMNode(overlay.node) as HTMLElement;
          setTimeout(() => {
            node.style.zIndex = null;
          }, DURATION);
          overlay.onClose();
        }
      });
    }
  }

  hideOverlay() {
    this.props.onRequestClose();
  }

  handleEscape = (event: KeyboardEvent) => {
    if (event.keyCode == 27) {
      // Check if newest overlay watches for escape
      const { overlays } = this.props;
      const last = _.last(overlays);
      if (last && last.escapeToClose)
        this.hideOverlay();
    }
  }

  handleClick = () => {
    // Check if newest overlay watches for clicks
    const { overlays } = this.props;
    const last = _.last(overlays);
      if (last && last.clickToClose)
        this.hideOverlay();
  };

  render() {
    const { overlays } = this.props;
    const cssClass = classnames('Overlays', {
      'Overlays--active': !!overlays.length
    });
    // I think setting key as index should be ok in this case, since we only push/pop overlays
    return (
      <div className={cssClass} style={{ zIndex: 5000 + (overlays.length - 1) * 2 }} onClick={this.handleClick}>
        <ReactCSSTransitionGroup
          transitionName="overlay"
          transitionEnter={true}
          transitionEnterTimeout={DURATION}
          transitionLeave={true}
          transitionLeaveTimeout={DURATION}
        >
          {
            overlays.map((overlay, i) => <Overlay key={i} options={overlay} zIndex={5000 + i * 2} />)
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    overlays: state.overlay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestClose: () => {
      dispatch(hideOverlay());
    }
  };
}

const OverlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlays);

export default OverlayContainer;