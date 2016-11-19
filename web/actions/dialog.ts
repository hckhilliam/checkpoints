import { Action } from 'redux';

import { OverlayOptions } from './overlay';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export interface DialogOptions extends OverlayOptions {
  title?: string;
  size?: 'Small' | 'Medium' | 'Large';
}

export interface DialogAction extends Action {
  options: DialogOptions;
}

const defaultOptions: DialogOptions = {
  title: '',
  size: 'Medium',
  opaque: true,
  clickToClose: true,
  escapeToClose: true,
  onClose: () => {}
};

function openDialogAction(node: any, options = defaultOptions): DialogAction {
  if (options != defaultOptions)
    options = Object.assign({}, defaultOptions, options);
  options.node = node;
  return {
    type: OPEN_DIALOG,
    options
  };
}

function closeDialogAction(): Action {
  return {
    type: CLOSE_DIALOG
  };
}

export function openDialog(node: any, options = defaultOptions) {
  return dispatch => {
    dispatch(openDialogAction(node, options));
  };
}

export function closeDialog() {
  return dispatch => {
    dispatch(closeDialogAction());
  };
}