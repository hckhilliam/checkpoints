import './InkRipple.scss';

import * as React from 'react';
import * as classnames from 'classnames';
import * as update from 'immutability-helper';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface InkRippleProps extends React.HTMLAttributes {
  duration?: number;
}

interface InkRippleState {
  ripples?: Ripple[];
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const RippleElement = (props: { ripple: Ripple }) => {
  return (
    <div className="RippleElement" />
  )
}

export default class InkRipple extends React.Component<InkRippleProps, InkRippleState> {
  static defaultProps: InkRippleProps = {
    duration: 2000
  }

  state: InkRippleState = {
    ripples: []
  }

  counter = 0;

  startRipple() {
    const counter = ++this.counter;
    window.setTimeout(() => {
      this.setState({
        ripples: this.state.ripples.filter(r => r.id != counter)
      });
    }, this.props.duration);

    const ripple: Ripple = {
      id: counter,
      x: 0,
      y: 0
    };
    const ripples = update(this.state.ripples, {
      $push: [ripple]
    });
    this.setState({ ripples });
  }

  handleRipple = (event: React.MouseEvent) => {
    console.log(event.clientX, event.clientY);
    this.startRipple();
  }

  render() {
    const { className } = this.props;
    const other = _.omit(this.props, 'className', 'duration');

    const cssClass = classnames('InkRipple', className);

    return (
      <div className={cssClass} {...other} onMouseDown={this.handleRipple}>
        {this.state.ripples.map(r => <RippleElement key={r.id} ripple={r} />)}
      </div>
    );
  }
}