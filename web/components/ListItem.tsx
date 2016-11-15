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
  expanded?: boolean;
  body?: JSX.Element;
}

interface ExpandableListItemState {
  bodyHeight?: number;
}

class BaseExpandableListItem extends React.Component<ExpandableListItemProps, ExpandableListItemState> {
  static defaultProps: ExpandableListItemProps = {
    selected: false,
    expanded: false
  };

  state: ExpandableListItemState = {
    bodyHeight: 0
  };

  body: HTMLDivElement;

  componentWillReceiveProps(nextProps: ExpandableListItemProps) {
    if (this.body && !this.props.expanded && nextProps.expanded) {
      const bodyHeight = this.body.clientHeight;
      if (this.state.bodyHeight != bodyHeight)
        this.setState({ bodyHeight });
    }
  }

  render() {
    const { className, children, selected, expanded, body } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'selected', 'expanded', 'body', 'style');
    const cssClass = classnames('ExpandableListItem', className, {
      'ExpandableListItem--selected': selected,
      'ExpandableListItem--expanded': selected && expanded
    });

    const style = Object.assign({}, this.props.style);
    if (selected && expanded)
      style.paddingBottom = this.state.bodyHeight;

    return (
      <ListItem className={cssClass} style={style} {...other}>
        <div className="ExpandableListItem-content">
          {children}
        </div>
        <div className="ExpandableListItem-body" ref={n => this.body = n}>
          {body}
        </div>
      </ListItem>
    );
  }
}

export const ExpandableListItem = AddLinearProgress(InkRipple(BaseExpandableListItem));
export const ClickableListItem = InkRipple(ListItem);

export default ListItem;