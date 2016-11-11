import './List.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { ListItem as LI, SelectableListItem as SLI, ExpandableListItem as ELI } from './ListItem';
export const ListItem = LI;
export const SelectableListItem = SLI;
export const ExpandableListItem = ELI;

export class List extends React.Component<React.HTMLAttributes, {}> {
  render() {
    const { className, children } = this.props;
    const other = _.omit(this.props, 'className', 'children');

    const cssClass = classnames('List', className);

    return (
      <ul className={cssClass} {...other}>
        {children}
      </ul>
    );
  }
}

export default List;