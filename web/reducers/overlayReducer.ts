import { REQUEST_OVERLAY, CLEAR_OVERLAY, OverlayAction, OverlayOptions } from '../actions/overlay';

type OverlayState = OverlayOptions[];

function requestOverlay(state: OverlayState, options: OverlayOptions) {
  return state.concat([options]);
}

function clearOverlay(state: OverlayState) {
  return state.slice(0, -1);
}

export default function reducer(state: OverlayState = [], action) {
  switch (action.type) {
    case REQUEST_OVERLAY:
      return requestOverlay(state, (action as OverlayAction).options);
    case CLEAR_OVERLAY:
      return clearOverlay(state);
    default:
      return state;
  }
}
