import './DropdownList.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactCSSTTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as classnames from 'classnames';

import { List } from './List';

import { closeDropdownList, DropdownListOptions } from '../actions/dropdownlist';
import { showOverlay, hideOverlay, OverlayOptions } from '../actions/overlay';

interface DropdownListProps extends React.HTMLAttributes {
  options?: DropdownListOptions;
  onOpen?: (node: Element, updatedPropOptions: DropdownListProps) => void;
  onClose?: () => void;
  onDestroy?: () => void;
}

interface State {
  selectedIndex: number;
  listItems: JSX.Element[];
}

class DropdownList extends React.Component<DropdownListProps, {}> {
  state: State = {
    selectedIndex: -1,
    listItems: []
  };

  element: HTMLElement;

  cycleListItems = function* (resume: (cycler, cycle: () => void) => any, fn: () => void) {
    fn();
    setTimeout(resume, 350);
    let stop: boolean = yield;
    for (; !stop;) {
      fn();
      setTimeout(resume, 40);
      stop = yield;
    }
  };

  runCycle = (cycler, cycle: () => void) => {
    let iterator = cycler(resume, cycle);

    function resume() {
      iterator.next(false);
    }

    iterator.next(false);

    return iterator;
  };

  cycler = null;
  up: boolean;
  arrowDown = (e: KeyboardEvent) => {
    if (e.key == 'ArrowUp' || e.code == 'ArrowUp') {
      if (!this.cycler || !this.up) {
        if (this.cycler) { this.cycler.next(true); }
        this.cycler = this.runCycle(
          this.cycleListItems,
          () => this.setListItems(this.props, (this.state.selectedIndex + this.state.listItems.length) % (this.state.listItems.length + 1))
        );
        this.up = true;
      }
    } else if (e.key == 'ArrowDown' || e.code == 'ArrowDown') {
      if (!this.cycler || this.up) {
        if (this.cycler) { this.cycler.next(true); }
        this.cycler = this.runCycle(
          this.cycleListItems,
          () => {
            this.setListItems(this.props, (this.state.selectedIndex + 1) % (this.state.listItems.length + 1))
          }
        );
        this.up = false;
      }
    }
  };

  arrowUp = (e: KeyboardEvent) => {
    if (this.cycler && (e.key == 'ArrowUp' || e.code == 'ArrowUp'
                    || e.key == 'ArrowDown' || e.code == 'ArrowDown')) {
      this.cycler.next(true);
      this.cycler = null;
    }
  };

  componentWillReceiveProps(nextProps: DropdownListProps) {
    if (!this.props.options && nextProps.options) {
      this.props.onOpen(this.element, nextProps);

      let boundingRect = nextProps.options.anchor.getBoundingClientRect();
      this.element.style.top = (boundingRect.top + boundingRect.height).toString();
      this.element.style.left = boundingRect.left.toString();
      this.element.style.width = boundingRect.width.toString();

      window.addEventListener('keydown', this.arrowDown);
      window.addEventListener('keyup', this.arrowUp);
    } else if (!nextProps.options && this.props.options) {
      this.props.onDestroy();
      window.removeEventListener('keydown', this.arrowDown);
      window.removeEventListener('keyup', this.arrowUp);
    }

    this.setListItems(nextProps);
  }

  handleClose = () => {
    this.props.onClose();
  };

  setRef = (element: HTMLElement) => {
    this.element = element;
  };

  handleMouseOver = (index: number) => {
    this.setListItems(this.props, index);
  };

  setListItems = (props: DropdownListProps, selected?: number) => {
    let node: JSX.Element[] = (_.get(props, 'options.node') || []) as JSX.Element[];
    let listItems: JSX.Element[] = [];
    for (let i = 0; i < node.length; ++i) {
      let className = classnames('list-item', i == selected ? 'selected' : '');
      listItems.push(<div key={i} className={className} onMouseOver={() => this.handleMouseOver(i)}>{node[i]}</div>);
    }
    this.setState({ selectedIndex: selected != null ? selected : listItems.length, listItems: listItems })
  }

  render() {
    const { options } = this.props;
    const { listItems } = this.state;
    const cssClass = classnames('Dropdownlist');
    return (
      <List className={cssClass} reference={this.setRef}>
        {listItems}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    options: state.dropdownlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOpen: (node: Element, updatedProps: DropdownListProps) => {
      dispatch(showOverlay(node, Object.assign({}, updatedProps.options, {
        onClose: () => {
          dispatch(closeDropdownList());
          updatedProps.onClose();
        }
      })));
    },
    onClose: () => {
      dispatch(closeDropdownList());
      dispatch(hideOverlay());
    },
    onDestroy: () => {
      dispatch(hideOverlay());
    }
  };
}

const DropdownlistContainer = connect(mapStateToProps, mapDispatchToProps)(DropdownList);

export default DropdownlistContainer;