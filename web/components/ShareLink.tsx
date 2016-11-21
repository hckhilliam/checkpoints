import './ShareLink.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { MaterialIcon } from './Icon';

interface ShareLinkProps extends React.HTMLAttributes {
  url: string;
}

const PermaLink = ({ url }: { url: string }) => {
  return (
    <a className="PermaLink" href={url} target="_blank">
      <MaterialIcon icon="link" />
      <span className="ShareLink-text">{url}</span>
    </a>
  );
};

const FacebookLink = ({ url }: { url: string }) => {
  url = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  return (
    <a className="FacebookLink" href={url} target="_blank">
      <MaterialIcon icon="share" />
      <span className="ShareLink-text">Share on Facebook</span>
    </a>
  );
};

export default class ShareLink extends React.Component<ShareLinkProps, {} > {
  render() {
    const { url, className } = this.props;
    const other = _.omit(this.props, 'url', 'className');
    const cssClass = classnames('ShareLink', className);

    return (
      <div className={cssClass} {...other}>
        <div className="ShareLink-link">
          <FacebookLink url={url} />
        </div>
        <div className="ShareLink-link">
          <PermaLink url={url} />
        </div>
      </div>
    );
  }
};

