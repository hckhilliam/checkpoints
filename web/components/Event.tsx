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
    dateDisplay = `${dateformat(event.startTime, 'mmmm dS h:MM')} - ${dateformat(event.endTime, 'h:MM')}`;
  } else {
    dateDisplay = `${dateformat(event.startTime, 'mmmm dS h:MM')} - ${dateformat(event.endTime, 'mmmm dS h:MM')}`;
  }
  return (
    <div className="Event">
      <img className="Event-thumbnail" src={event.pictureURL}/>
      <div className="Event-details">
        <h1 className="Event-name">{event.name}</h1>
        <h2 className="Event-date">{dateDisplay}</h2>
      </div>
    </div>
  );
}

 export default Event;