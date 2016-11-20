import './Events.scss';

import * as React from 'react';
import { connect } from 'react-redux';

const Linkify = require('react-linkify').default;

import Event from './Event';
import Panel from './Panel';
import { List, ExpandableListItem } from './List';

import { getEvents } from '../actions/events';

interface Props {
  events?: Checkpoints.Event[];
  onGetEvents?: (eventSearch) => void;
}

interface State {
  selectEventID?: string;
}

const EventDescription = ({ event }: { event: Checkpoints.Event }) => {
  return (
    <div className="EventDescription">
      <h1>{event.name}</h1>
      <Linkify>
        <span>{event.description}</span>
      </Linkify>
    </div>
  );
};

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
      distance: 700,
      filter: undefined
    } as Checkpoints.eventSearch;
  };

  onClickEvent(id: string) {
    let prevSelected = this.state.selectEventID;
    if (prevSelected == id) {
      this.setState({ selectEventID: '' });
    }
    else {
      this.setState({ selectEventID: id });
    }
  }


  render() {
    return (
      <div className="Events">
        <Panel>
          <h1>Suggested Events</h1>
        </Panel>
        <List>
        {
          this.props.events.map((event) => {
            let id = this.getSelectEventID(event);
            const selected = id == this.state.selectEventID;
            return (
              <ExpandableListItem
                selected={selected}
                expanded={selected}
                key={id}
                loading={false}
                body={<EventDescription event={event} />}
                onClick={() => this.onClickEvent(id)}
              >
                <Event event={event} />
              </ExpandableListItem>
            )
          })
        }
        </List>
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
export default EventsContainer;
