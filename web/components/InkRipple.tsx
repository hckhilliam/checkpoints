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
  anchor: string;
}

const RippleElement = ({ ripple }: { ripple: Ripple }) => {
  const style = {
    top: ripple.y,
    left: ripple.x
  };
  const cssClass = classnames('RippleElement', `RippleElement--${ripple.anchor}`);
  return (
    <div className={cssClass} style={style} />
  )
};

const enterDuration = 400;
const leaveDuration = 200;

export class InkRippleElement extends React.Component<InkRippleProps, InkRippleState> {
  static defaultProps: InkRippleProps = {
    disabled: false
  };

  state: InkRippleState = {
    ripples: [],
    style: {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
  };

  node: HTMLDivElement;
  counter = 0;

  startRipple(x: number, y: number, anchor: string = 'center') {
    const counter = ++this.counter;
    window.setTimeout(() => {
      this.setState({
        ripples: this.state.ripples.filter(r => r.id != counter)
      });
    }, enterDuration);

    const ripple: Ripple = {
      id: counter,
      x,
      y,
      anchor
    };
    const ripples = update(this.state.ripples, {
      $push: [ripple]
    });
    this.setState({ ripples });
  }

  handleRipple = (event: React.MouseEvent) => {
    if (this.props.disabled)
      return;

    if (this.node) {
      let x = 0, y = 0;
      const rect = this.node.getBoundingClientRect();
      const { top, left, width } = rect;
      x = event.clientX - left;
      y = event.clientY - top;

      const anchor = x < width / 3
        ? 'left'
        : x > width / 3 * 2
          ? 'right'
          : 'center';
      this.startRipple(x, y, anchor);
    }
  };

  handleRef = (node: HTMLDivElement) => {
    this.node = node;
    if (!node)
      return;

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
  };

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

/**
 * Adds a ripple effect to the component.
 * Position must be absolute or relative, and must render props.children.
 */
export function InkRipple<P>(WrappedComponent: React.ComponentClass<P>): React.ComponentClass<P & InkRippleProps> {
  return class extends React.Component<P & InkRippleProps, {}> {
    render() {
      const { children, disabled } = this.props;
      const other = _.omit(this.props, 'children', 'disabled');
      if (!_.isUndefined(disabled))
        other['disabled'] = disabled;

      return <WrappedComponent {...other}>{children}<InkRippleElement disabled={disabled} /></WrappedComponent>
    }
  };
}

export default InkRipple;