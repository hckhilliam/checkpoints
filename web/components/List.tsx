import './List.scss';

import * as React from 'react';
import * as classnames from 'classnames';

import { ListItem as LI, ExpandableListItem as ELI, ClickableListItem as CLI } from './ListItem';
export const ListItem = LI;
export const ExpandableListItem = ELI;
export const ClickableListItem = CLI;

interface Props extends React.HTMLAttributes {
  reference?: (element: HTMLElement) => void;
  listStyle?: 'Raised' | 'Flat';
}

export class List extends React.Component<Props, {}> {
  static defaultProps: Props = {
    listStyle: 'Raised'
  }

  render() {
    const { className, children, reference, listStyle } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'reference', 'listStyle');

    const cssClass = classnames('List', className, `List--${listStyle}`);

    return (
      <ul className={cssClass} {...other} ref={reference}>
        {children}
      </ul>
    );
  }
}

export default List;
export type ListProps = Props;