import { Action } from 'redux';

import { hideOverlay, OverlayOptions } from './overlay';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export interface DialogOptions {
  node?: any;
  clickToClose?: boolean;
  escapeToClose?: boolean;
  title?: string;
  size?: 'Small' | 'Medium' | 'Large';
  onClose?: () => void;
}

export interface DialogAction extends Action {
  options: DialogOptions;
}

const defaultOptions: DialogOptions & OverlayOptions = {
  title: '',
  size: 'Medium',
  opaque: true,
  clickToClose: true,
  escapeToClose: true,
  onClose: () => {}
};

export function openDialog(node: any, options = defaultOptions): DialogAction {
  if (options != defaultOptions)
    options = Object.assign({}, defaultOptions, options);
  options.node = node;
  return {
    type: OPEN_DIALOG,
    options
  };
}

export function closeDialog() {
  return hideOverlay();
}

/**
 * Action to pop last dialog, used internally by dialogs
 */
export function removeDialog(): Action {
  return {
    type: CLOSE_DIALOG
  };
}