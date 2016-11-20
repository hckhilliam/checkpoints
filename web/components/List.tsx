import './List.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { ListItem as LI, ExpandableListItem as ELI, ClickableListItem as CLI } from './ListItem';
export const ListItem = LI;
export const ExpandableListItem = ELI;
export const ClickableListItem = CLI;

interface Props extends React.HTMLAttributes {
  reference?: (element: HTMLElement) => void;
}

export class List extends React.Component<Props, {}> {
  render() {
    const { className, children, reference } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'reference');

    const cssClass = classnames('List', className);

    return (
      <ul className={cssClass} {...other} ref={reference}>
        {children}
      </ul>
    );
  }
}

export default List;