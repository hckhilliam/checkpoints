import './ListItem.scss';

import * as React from 'react';
import * as classnames from 'classnames';
import * as Measure from 'react-measure';

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
  body?: React.ReactNode;
}

interface ExpandableListItemState {
  bodyHeight?: number;
}

class ExpandableListItemContentElement extends React.Component<React.HTMLAttributes, {}> {
  render() {
    return (
      <div className="ExpandableListItem-content" {...this.props}>
        {this.props.children}
      </div>
    );
  }
}
const ExpandableListItemContent = InkRipple(ExpandableListItemContentElement as any);

class BaseExpandableListItem extends React.Component<ExpandableListItemProps, ExpandableListItemState> {
  static defaultProps: ExpandableListItemProps = {
    selected: false,
    expanded: false
  };

  state: ExpandableListItemState = {
    bodyHeight: 0
  };

  handleMeasure = (dimensions: Measure.Dimensions) => {
    this.setState({ bodyHeight: dimensions.height });
  };

  render() {
    const { className, children, selected, expanded, body, onClick } = this.props;
    const other = _.omit(this.props, 'className', 'children', 'selected', 'expanded', 'body', 'style', 'onClick');
    const cssClass = classnames('ExpandableListItem', className, {
      'ExpandableListItem--selected': selected,
      'ExpandableListItem--expanded': selected && expanded
    });

    const style = Object.assign({}, this.props.style);
    if (selected && expanded)
      style.paddingBottom = this.state.bodyHeight;

    return (
      <ListItem className={cssClass} style={style} {...other}>
        <ExpandableListItemContent onClick={onClick}>
          {children}
        </ExpandableListItemContent>
        {
          selected &&
            <Measure onMeasure={this.handleMeasure} whitelist={['height']}>
              <div className="ExpandableListItem-body">
                {body}
              </div>
            </Measure>
        }
      </ListItem>
    );
  }
}

export const ExpandableListItem = AddLinearProgress(BaseExpandableListItem);
export const ClickableListItem = InkRipple(ListItem);

export default ListItem;