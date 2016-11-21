import { Action } from 'redux';

import { hideOverlay, OverlayOptions } from './overlay';

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

export function openDropdownList(node: any, options): DropdownListAction {
  if (options != defaultOptions) {
    options = Object.assign({}, defaultOptions, options);
  }
  options.node = node;
  return {
    type: OPEN_DROPDOWN,
    options
  };
}

export const closeDropdownList = hideOverlay;

/**
 * Internal use only!!
 */
export function removeDropdownList(): Action {
  return {
    type: CLOSE_DROPDOWN
  };
}
