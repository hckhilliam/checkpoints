import './ListItem.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { AddLinearProgress } from './LinearProgress';
import InkRipple from './InkRipple';

export class ListItem extends React.Component<React.HTMLAttributes, {}> {
  render() {
    const { className, children } = this.props;
    const other = _.omit(this.props, 'className', 'children');

    const cssClass = classnames('ListItem', className);

    return (
      <div className={cssClass} {...other}>
        {children}
      </div>
    );
  }
}

interface ExpandableListItemProps extends React.HTMLAttributes {
  selected?: boolean;
}

class BaseExpandableListItem extends React.Component<ExpandableListItemProps, {}> {
  static defaultProps: ExpandableListItemProps = {
    selected: false
  }

  render() {
    const { className, children, selected, loading } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'selected', 'loading');

    const cssClass = classnames('ExpandableListItem', className, {
      'ExpandableListItem--selected': selected
    });

    return (
      <ListItem className={cssClass} {...other}>
        <div className="ExpandableListItem-content">
          {children}
        </div>
      </ListItem>
    );
  }
}

export const ExpandableListItem = AddLinearProgress(InkRipple(BaseExpandableListItem));

export default ListItem;