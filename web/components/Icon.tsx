import './Icon.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface IconProps extends React.HTMLAttributes {

}

export default class Icon extends React.Component<IconProps, {}> {
  render() {
    const { className, children } = this.props;
    const other = _.omit(this.props, 'className');
    const cssClass = classnames('Icon', className);
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