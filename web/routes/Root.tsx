import * as React from 'react';
import Overlay from '../components/Overlay';
import Dialogs from '../components/Dialogs';
import DropdownList from '../components/DropdownList';

const Root = props => {
  return (
    <div style={{ position: 'relative' }}>
      <Overlay />
      <Dialogs />
      <DropdownList />
      {props.children}
    </div>
  );
};
export default Root;
