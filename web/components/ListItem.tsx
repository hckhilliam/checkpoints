import './ListItem.scss';

import * as React from 'react';
import * as classnames from 'classnames';

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

export const SelectableListItem = InkRipple(ListItem);

interface ExpandableListItemProps extends React.HTMLAttributes {
  selected?: boolean;
}

export class ExpandableListItem extends React.Component<ExpandableListItemProps, {}> {
  render() {
    const { className, children, selected } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'selected');

    const cssClass = classnames('ExpandableListItem', className, {
      'ExpandableListItem--selected': selected
    });

    return (
      <SelectableListItem className={cssClass} {...other}>
        {children}
      </SelectableListItem>
    )
  }
}

export default ListItem;