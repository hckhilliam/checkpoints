import './InkRipple.scss';

import * as React from 'react';
import * as classnames from 'classnames';
import * as update from 'immutability-helper';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface InkRippleProps extends React.HTMLAttributes {
  disabled?: boolean;
}

interface InkRippleState {
  ripples?: Ripple[];
  style?: React.CSSProperties;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const RippleElement = ({ ripple }: { ripple: Ripple }) => {
  const style = {
    top: ripple.y,
    left: ripple.x
  };
  return (
    <div className="RippleElement" style={style} />
  )
}

const enterDuration = 300;
const leaveDuration = 200;

export default class InkRipple extends React.Component<InkRippleProps, InkRippleState> {
  static defaultProps: InkRippleProps = {
    disabled: false
  }

  state: InkRippleState = {
    ripples: [],
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  }

  node: HTMLDivElement;
  counter = 0;

  startRipple(x: number, y: number) {
    const counter = ++this.counter;
    window.setTimeout(() => {
      this.setState({
        ripples: this.state.ripples.filter(r => r.id != counter)
      });
    }, enterDuration);

    const ripple: Ripple = {
      id: counter,
      x,
      y
    };
    const ripples = update(this.state.ripples, {
      $push: [ripple]
    });
    this.setState({ ripples });
  }

  handleRipple = (event: React.MouseEvent) => {
    if (this.props.disabled)
      return;

    let x = 0, y = 0;
    if (this.node) {
      const rect = this.node.getBoundingClientRect();
      const { top, left } = rect;
      x = event.clientX - left;
      y = event.clientY - top;
    }
    this.startRipple(x, y);
  }

  handleRef = (node: HTMLDivElement) => {
    this.node = node;
    const size = Math.max(node.clientWidth, node.clientHeight);

    let left: number | string;
    let top: number | string;
    let transform = '';
    if (node.clientWidth > node.clientHeight) {
      left = 0;
      top = '50%';
      transform = 'translateY(-50%)';
    } else {
      left = '50%';
      top = 0;
      transform = 'translateX(-50%)';
    }

    this.setState({
      style: {
        position: 'relative',
        width: size,
        height: size,
        left,
        top,
        transform
      }
    });
  }

  render() {
    const { className } = this.props;
    const other = _.omit(this.props, 'className');

    const cssClass = classnames('InkRipple', className);

    return (
      <div className={cssClass} {...other} onMouseDown={this.handleRipple}>
        <div style={this.state.style} ref={this.handleRef}>
          <ReactCSSTransitionGroup
            transitionName="ripple"
            transitionEnterTimeout={enterDuration}
            transitionLeaveTimeout={leaveDuration}
          >
            {this.state.ripples.map(r => <RippleElement key={r.id} ripple={r} />)}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}