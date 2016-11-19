import { OPEN_DIALOG, CLOSE_DIALOG, DialogAction, DialogOptions } from '../actions/dialog';

type DialogState = DialogOptions[];

function openDialog(state: DialogState, options: DialogOptions) {
  return state.concat([options]);
}

function closeDialog(state: DialogState) {
  return state.slice(0, -1);
}

export default function reducer(state: DialogState = [], action) {
  switch(action.type) {
    case OPEN_DIALOG:
      return openDialog(state, (action as DialogAction).options);
    case CLOSE_DIALOG:
      return closeDialog(state);
    default:
      return state;
  }
}
