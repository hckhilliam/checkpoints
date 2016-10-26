import * as React from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';


export default class Event extends React.Component<{}, {}> {

  componentDidMount() {
    // console.log('componentDidMount on events was run');
    // getEvents();
  }

  tryFunction = () => {
    console.log("tryFunction was run");
    getEvents();
  }

  render() {
    return (
      <div>
        <button onClick={this.tryFunction}>events</button>
      </div>
    );
  };
}  