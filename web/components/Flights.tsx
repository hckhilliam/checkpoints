import './Flights.scss';

import * as React from 'react';
import { connect } from 'react-redux';

// const Linkify = require('react-linkify').default;

import Flight from './Flight';
import Panel from './Panel';
import { List, ListItem } from './List';
import { getRecommendFlights } from '../actions/flights';


interface Props {
  flights?: Checkpoints.Flight[];
  onGetFlights?: () => void;
}

interface State {
  selectFlightID?: string;
}

export class Flights extends React.Component<Props, State> {
  componentDidMount() {
    this.props.onGetFlights();
  }

  state: State = {
    selectFlightID: ''
  };

  getID(flight: Checkpoints.Flight) {
    return JSON.stringify(flight);
  }

  onClickEvent(id: string) {
    let prevSelected = this.state.selectFlightID;
    if (prevSelected == id) {
      this.setState({ selectFlightID: '' });
    }
    else {
      this.setState({ selectFlightID: id });
    }
  }


  render() {
    return (
      <div className="Flights">
        <Panel>
          <h1>Suggested Destinations</h1>
        </Panel>
        <List>
        { 
          this.props.flights.map((flight) => {
            let id = this.getID(flight);
            const selected = id == this.state.selectFlightID;
            return (
              <ListItem key={id}>
                <Flight flight={flight} />
              </ListItem>
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
    flights: state.flights
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetFlights: () => {
      dispatch(getRecommendFlights());
    }
  }
};

export const FlightsContainer = connect(mapStateToProps, mapDispatchToProps)(Flights);
export default FlightsContainer;