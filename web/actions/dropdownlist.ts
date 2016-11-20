import { Action } from 'redux';

import { OverlayOptions } from './overlay';

export const OPEN_DROPDOWN = 'OPEN_DROPDOWN';
export const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN';

export interface DropdownListOptions extends OverlayOptions {
  anchor?: HTMLElement;
  minWidth?: number;
}

export interface DropdownListAction extends Action {
  options: OverlayOptions;
}

const defaultOptions: DropdownListOptions = {
  anchor: null,
  minWidth: 256,
  opaque: false,
  clickToClose: true,
  escapeToClose: true,
  onClose: () => {}
};

function openDropdownListAction(node: any, options): DropdownListAction {
  if (options != defaultOptions) {
    options = Object.assign({}, defaultOptions, options);
  }
  options.node = node;
  return {
    type: OPEN_DROPDOWN,
    options
  };
} 

function closeDropdownListAction(): Action {
  return {
    type: CLOSE_DROPDOWN
  };
}

export function openDropdownList(node: any, options = defaultOptions) {
  return dispatch => {
    dispatch(openDropdownListAction(node, options));
  };
}

export function closeDropdownList() {
  return dispatch => {
    dispatch(closeDropdownListAction());
  };
}