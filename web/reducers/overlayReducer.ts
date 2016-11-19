import { REQUEST_OVERLAY, CLEAR_OVERLAY, OverlayAction, OverlayOptions } from '../actions/overlay';

type OverlayState = OverlayOptions[];

function showOverlay(state: OverlayState, options: OverlayOptions) {
  return state.concat([options]);
}

function hideOverlay(state: OverlayState) {
  return state.slice(0, -1);
}

export default function reducer(state: OverlayState = [], action) {
  switch (action.type) {
    case REQUEST_OVERLAY:
      return showOverlay(state, (action as OverlayAction).options);
    case CLEAR_OVERLAY:
      return hideOverlay(state);
    default:
      return state;
  }
}
