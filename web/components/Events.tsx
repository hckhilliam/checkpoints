import './Events.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import Event from './Event';

interface Props {
  events?: Checkpoints.Event[];
  onGetEvents?: (eventSearch) => void;
}

export class Events extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.onGetEvents(this.getSearchQuery());
  }

  getSearchQuery = () => {
    return {
      lat: 40.710803,
      lng: -73.964040,
      distance: undefined,
      filter: undefined
    } as Checkpoints.eventSearch; 
  }

  render() {
    return (
      <div className="Events">
      {
        this.props.events.map((item, index) => {
          return <Event event={item} key={index}/>
        })
      }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetEvents: (search: Checkpoints.eventSearch) => {
      dispatch(getEvents(search));
    }
  }
};

export const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);
export default EventsContainer