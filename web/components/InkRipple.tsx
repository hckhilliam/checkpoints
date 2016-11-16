import './InkRipple.scss';

import * as React from 'react';
import * as classnames from 'classnames';
import * as update from 'immutability-helper';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import counter from '../lib/counter';

interface InkRippleProps extends React.HTMLAttributes {
  disabled?: boolean;
  shade?: 'Light' | 'Normal' | 'Dark';
  duration?: 'Slow' | 'Fast';
  size?: number; // size of ripple, leave empty for auto
  toggle?: boolean; // Change on toggle prop issues ripple on middle of element
  center?: boolean; // true: center on ripple, false: center on click (default)
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
  style: React.CSSProperties;
}

const RippleElement = ({ ripple, duration }: { ripple: Ripple, duration: 'Slow' | 'Fast' }) => {
  const style = {
    top: ripple.y,
    left: ripple.x
  };
  const cssClass = classnames('RippleElement', `RippleElement--${ripple.anchor}`, `RippleElement--${duration}`);
  return (
    <div className={cssClass} style={style} />
  )
};

const enterDuration = {
  Slow: 400,
  Fast: 200
};

const leaveDuration = {
  Slow: 200,
  Fast: 100
};

export class InkRippleElement extends React.Component<InkRippleProps, InkRippleState> {
  static defaultProps: InkRippleProps = {
    disabled: false,
    shade: 'Normal',
    duration: 'Slow',
    center: false
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
  counter = counter();

  componentWillReceiveProps(nextProps: InkRippleProps) {
    const t1 = this.props.toggle;
    const t2 = nextProps.toggle;
    if (!_.isUndefined(t1 || t2) && t1 != t2) {
      this.startCenterRipple();
    }
  }

  startCenterRipple() {
    if (this.node) {
      let x = 0, y = 0;
      const rect = this.node.getBoundingClientRect();
      const { width, height } = rect;
      x = width / 2;
      y = height / 2;

      this.startRipple(x, y);
    }
  }

  startRipple(x: number, y: number, anchor: string = 'center') {
    const counter = this.counter.next().value;
    window.setTimeout(() => {
      this.setState({
        ripples: this.state.ripples.filter(r => r.id != counter)
      });
    }, enterDuration);

    const ripple: Ripple = {
      id: counter,
      x,
      y,
      anchor,
      style: this.state.style
    };

    const ripples = update(this.state.ripples, {
      $push: [ripple]
    });
    this.setState({ ripples });
  }

  handleRipple = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (this.props.disabled)
      return;

    if (this.node && !this.props.center) {
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
    } else {
      this.startCenterRipple();
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
    const { className, shade, duration, toggle, size } = this.props;
    const other = _.omit(this.props, 'className', 'shade', 'toggle', 'duration', 'size', 'center');

    const cssClass = classnames('InkRipple', className, `InkRipple--${shade}`);
    const style = _.pick(this.state.style, 'position', 'width', 'height');
    const baseStyle = {};

    if (!_.isUndefined(size)) {
      style['width'] = style['height'] = size;
      style['top'] = style['left'] = '50%';
      style['transform'] = 'translate(-50%, -50%)';
      baseStyle['overflow'] = 'visible';
    }

    return (
      <div className={cssClass} {...other} style={baseStyle} onMouseDown={_.isUndefined(toggle) ? this.handleRipple : undefined}>
        <div ref={this.handleRef} style={style}>
          <ReactCSSTransitionGroup
            transitionName="ripple"
            transitionEnterTimeout={enterDuration[`${duration}`]}
            transitionLeaveTimeout={leaveDuration[`${duration}`]}
          >
            {this.state.ripples.map(r => <RippleElement key={r.id} ripple={r} duration={duration} />)}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

interface InkRippleOptions {
  shade?: 'Light' | 'Normal' | 'Dark';
}

const defaultInkRippleOptions: InkRippleOptions = {
  shade: 'Normal'
};

export function AdvancedInkRipple<P>(options = defaultInkRippleOptions): (WrappedComponent: React.ComponentClass<P>) => (React.ComponentClass<P & InkRippleProps>) {
  return function InkRipple(WrappedComponent: React.ComponentClass<P>): React.ComponentClass<P & InkRippleProps> {
    return class extends React.Component<P & InkRippleProps, {}> {
      render() {
        const { children, disabled } = this.props;
        const other = _.omit(this.props, 'children', 'disabled');
        if (!_.isUndefined(disabled))
          other['disabled'] = disabled;

        return <WrappedComponent {...other}>{children}<InkRippleElement disabled={disabled} {...options} /></WrappedComponent>
      }
    };
  };
}

/**
 * Adds a ripple effect to the component.
 * Position must be absolute or relative, and must render props.children.
 */
export function InkRipple<P>(WrappedComponent: React.ComponentClass<P>): React.ComponentClass<P & InkRippleProps> {
  return AdvancedInkRipple<P>()(WrappedComponent);
}

export default InkRipple;