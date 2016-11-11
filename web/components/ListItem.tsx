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
      <div className={cssClass}>
        {children}
      </div>
    );
  }
}

export const SelectableListItem = InkRipple(ListItem);
export default ListItem;