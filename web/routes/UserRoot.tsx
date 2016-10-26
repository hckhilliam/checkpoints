import './UserRoot.scss';

import * as React from 'react';

import Header from '../components/Header';

const Root = props => {
  return (
    <div className="UserRoot">
      <Header />
      <div className="UserRoot-content">
        {props.children}
      </div>
    </div>
  );
}
export default Root;
