import * as React from 'react';
import Overlay from '../components/Overlay';
import Dialogs from '../components/Dialogs';

const Root = props => {
  return (
    <div style={{ position: 'relative' }}>
      <Overlay />
      <Dialogs />
      {props.children}
    </div>
  );
};
export default Root;
