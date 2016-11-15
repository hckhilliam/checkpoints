import './Events.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import Event from './Event';
import { List, ExpandableListItem } from './List';

interface Props {
  events?: Checkpoints.Event[];
  onGetEvents?: (eventSearch) => void;
}

interface State {
  selectEventID?: string;
}

export class Events extends React.Component<Props, State> {
  componentDidMount() {
    this.props.onGetEvents(this.getSearchQuery());
  }

  state: State = {
    selectEventID: ''
  };

  // id is just a stringified version of the event
  getSelectEventID(event: Checkpoints.Event) {
    return JSON.stringify(event);
  }

  getSearchQuery = () => {
    return {
      lat: 43.4761238,
      lng: -80.5378432,
      distance: 1000,
      filter: undefined
    } as Checkpoints.eventSearch;
  };

  onClickEvent(id: string) {
    let prevSelected = this.state.selectEventID;
    if (prevSelected == id) {
      this.setState({ selectEventID: "" });
    }
    else {
      this.setState({ selectEventID: id });
    }
  }

  render() {
    return (
      <List className="Events">
      {
        this.props.events.map((event) => {
          let id = this.getSelectEventID(event);
          const selected = id == this.state.selectEventID;
          return (
            <ExpandableListItem
              selected={selected}
              key={id}
              loading={false}
              onClick={() => this.onClickEvent(id)}
            >
              <Event event={event} />
            </ExpandableListItem>
          )
        })
      }
      </List>
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