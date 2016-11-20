import * as React from 'react';

interface Props {
  flight: Checkpoints.Flight;
}

export const Flight = (props: Props) => {
  let flight = props.flight;
  return (
    <div>
      <a href={flight.url} target='_blank'>
        <div>{flight.origin} to {flight.destintaion} leaving on {flight.departureDate}</div> 
        <div>${flight.price}</div>
      </a> 
    </div>
  );
} 

export default Flight;