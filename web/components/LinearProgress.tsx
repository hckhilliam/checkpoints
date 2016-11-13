import './LinearProgress.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface Props extends React.HTMLAttributes {
  enabled?: boolean;
}

export default class LinearProgress extends React.Component<Props, {}> {
  static defaultProps: Props = {
    enabled: true
  }

  render() {
    const { className, enabled } = this.props;
    const other = _.omit(this.props, 'className', 'enabled');

    const cssClass = classnames('LinearProgress', className, {
      'LinearProgress--enabled': enabled
    });

    return (
      <div className={cssClass} {...other}>
        <div className="LinearProgress-progress"></div>
        <div className="LinearProgress-progress"></div>
        <div className="LinearProgress-progress"></div>
      </div>
    );
  }
}

interface LinearProgressProps {
  loading?: boolean;
}

/**
 * Adds an indeterminate linear progress indicator at the bottom of the wrapped component.
 * Position must be absolute or relative, and must render props.children.
 */
export function AddLinearProgress<P>(WrappedComponent: React.ComponentClass<P>): React.ComponentClass<P & LinearProgressProps> {
  return class extends React.Component<P & LinearProgressProps, {}> {
    render() {
      const { children, loading } = this.props;
      const other = _.omit(this.props, 'children', 'loading');
      return (
        <WrappedComponent {...other}>
          {children}
          <LinearProgress className="WrappedLinearProgress" enabled={loading} />
        </WrappedComponent>
      );
    }
  };
}
