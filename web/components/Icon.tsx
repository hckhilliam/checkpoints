import './Icon.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface IconProps extends React.HTMLAttributes {
  iconSize?: 'Small' | 'Medium' | 'Large';
}

export default class Icon extends React.Component<IconProps, {}> {
  static defaultProps: IconProps = {
    iconSize: 'Small'
  };

  render() {
    const { className, children, iconSize } = this.props;
    const other = _.omit(this.props, 'className', 'iconSize');
    const cssClass = classnames('Icon', className, `Icon--${iconSize}`);
    return <div className={cssClass} {...other}>{children}</div>;
  }
}

interface MaterialIconProps extends IconProps {
  icon: string;
}

export const MaterialIcon = (props: MaterialIconProps) => {
  const { icon } = props;
  const other = _.omit(props, 'icon');
  return (
    <Icon {...other}>
      <i className="material-icons">{icon}</i>
    </Icon>
  );
}