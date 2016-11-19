import './FacebookShareButton.scss';

import * as React from 'react';
import * as classnames from 'classnames';

interface ShareButtonProps extends React.HTMLAttributes {
  url: string
}

export default class FacebookShareButton extends React.Component<ShareButtonProps, {} > {
  render() {
    const { url }  = this.props;
    const cssClass = classnames('FacebookShareButton', this.props.className);
    return (
      <div className={cssClass}>
        <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
          Share to Facebook
        </a>
      </div>
    );
  }
};

