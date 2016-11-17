import * as React from 'react';
import Overlay from '../components/Overlay';

const Root = props => {
  return (
    <div style={{ position: 'relative' }}>
      <Overlay />
      {props.children}
    </div>
  );
};
export default Root;
