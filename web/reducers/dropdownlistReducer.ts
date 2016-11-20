import { OPEN_DROPDOWN, CLOSE_DROPDOWN, DropdownListAction, DropdownListOptions } from '../actions/dropdownlist';

export default function reducer(state: DropdownListOptions = null, action) {
  switch(action.type) {
    case OPEN_DROPDOWN:
      return (action as DropdownListAction).options;
    case CLOSE_DROPDOWN:
      return null;
    default:
      return state;
  }
}