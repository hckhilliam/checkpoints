import * as React from 'react';
import { Link } from 'react-router';


const Root = props => {
  const { children } = props;

  return (
    <div>
      <h1>CheckPoints!</h1>
      {children}
    </div>
  );
}

export default Root;
