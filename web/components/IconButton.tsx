import './IconButton.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { AdvancedInkRipple } from './InkRipple';

interface IconButtonProps extends React.HTMLAttributes {
  raised?: boolean;
  primary?: boolean;
  disabled?: boolean;
}

export class IconButtonElement extends React.Component<IconButtonProps, {}> {
  static defaultProps: IconButtonProps = {
    raised: false,
    primary: false,
    disabled: false
  };

  getClassNames() {
    return {
      'IconButton--raised': this.props.raised,
      'IconButton--default': !this.props.primary,
      'IconButton--primary': this.props.primary,
      'IconButton--disabled': this.props.disabled,
    };
  }

  render() {
    const { className, disabled, children } = this.props;
    const other = _.omit(this.props, 'className', 'primary', 'raised');

    const cssClass = classnames('IconButton', className, this.getClassNames());

    return (
      <button className={cssClass} {...other}>
        {children}
      </button>
    );
  }
}

const IconButton = AdvancedInkRipple({
  shade: 'Normal',
  duration: 'Slow',
  size: 40,
  center: true
})(IconButtonElement)
export default IconButton;