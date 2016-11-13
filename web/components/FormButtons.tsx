import './FormButtons.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import Button from './Button';

interface Props {
  align?: 'center' | 'right',
  disabled?: boolean;
}

export default class FormButtons extends React.Component<Props, {}> {
  static defaultProps: Props = {
    align: 'right',
    disabled: false
  }

  render() {
    const { children, align, disabled } = this.props;
    const cssClass = classnames('FormButtons', `FormButtons-${align}`)
    return (
      <div className={cssClass}>
        {React.Children.map(children, child => React.cloneElement(child as any, { disabled}))}
      </div>
    );
  }
}