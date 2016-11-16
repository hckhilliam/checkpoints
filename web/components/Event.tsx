import './Event.scss'

import * as React from 'react';
import * as dateformat from 'dateformat';

interface Props {
  event: Checkpoints.Event;
}

export const Event = (props: Props) => {
  const event = props.event;
  let dateDisplay;
  if (event.startTime.toDateString() === event.endTime.toDateString()) { // checks if the date is the same
    dateDisplay = dateformat(event.startTime, 'mmmm dS h:MM') + ' - ' + dateformat(event.endTime, 'h:MM');
  } else {
    dateDisplay = dateformat(event.startTime, 'mmmm dS h:MM') + ' - ' + dateformat(event.endTime, 'mmmm dS h:MM');
  }
  return (
    <div className="Event">
      {/* <p>{event.description}</p>
      <p>{event.distance}?</p>
      <p>{event.eventSource}</p>*/ }
      <img className="Event-icon" src={event.pictureURL}/>
      <div className="Event-details">
        <div className="Event-name">{event.name}</div>
        <div className="Event-date">{ dateDisplay }</div>
      </div>
      <div style={{clear: 'both'}} />
    </div>
  );
}

 export default Event;