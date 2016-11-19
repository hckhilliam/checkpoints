import './Picture.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface Props extends React.HTMLAttributes {
  picture: Checkpoints.Picture;
}

export default class Picture extends React.Component<Props, {}> {
  render() {
    const { className, children, picture } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'picture');
    const cssClass = classnames('Picture', className);

    const ratio = picture.height / picture.width;

    let style: React.CSSProperties = {};
    if (ratio <= 1) {
      // landscape
      style.paddingBottom = `${ratio * 100}%`;
    } else {
      // portrait
      style.width = `${1 / ratio * 100}%`;
      style.paddingBottom = '100%';
    }

    return (
      <div className={cssClass} {...other}>
        <div className="Picture-image" style={style}>
          <img src={picture.url} />
          {children}
        </div>
      </div>
    );
  }
}
