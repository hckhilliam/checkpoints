import { Action } from 'redux';

export const REQUEST_OVERLAY = 'REQUEST_OVERLAY';
export const CLEAR_OVERLAY = 'CLEAR_OVERLAY';

export interface OverlayOptions {
  node?: any;
  opaque?: boolean;
  clickToClose?: boolean;
  escapeToClose?: boolean;
  onClose?: () => void;
}

export interface OverlayAction extends Action {
  options: OverlayOptions;
}

const defaultOptions: OverlayOptions = {
  opaque: true,
  clickToClose: true,
  escapeToClose: true,
  onClose: () => {}
};

export function requestOverlay(node: any, options = defaultOptions): OverlayAction {
  if (options != defaultOptions)
    options = Object.assign({}, defaultOptions, options);
  options.node = node;
  return {
    type: REQUEST_OVERLAY,
    options
  };
}

export function clearOverlay(): Action {
  return {
    type: CLEAR_OVERLAY
  };
}