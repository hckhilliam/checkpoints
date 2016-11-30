import './Flight.scss'

import * as React from 'react';
import * as dateformat from 'dateformat';

interface Props {
  flight: Checkpoints.Flight;
}

export const Flight = (props: Props) => {
  let flight = props.flight;
  return (
    <div className="Flight">
      <a href={flight.url} target="_blank">
        <div>{flight.originName}  to  {flight.destinationName}</div>
        <div>Leaving {dateformat(flight.departureDate, 'mmmm dS')}</div>
        <div>${flight.price.toFixed(2)}</div>
      </a> 
    </div>
  );
} 

export default Flight;