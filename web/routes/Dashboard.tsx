import './Dashboard.scss';

import * as React from 'react';
import { connect } from 'react-redux';

import CheckpointsSection from '../components/CheckpointsSection';
import Events from '../components/Events'
import Flights from '../components/Flights'
import FriendsSection from '../components/FriendsSection';

const Dashboard = props => {
  const user = !_.isEmpty(props.user);
  return (
    <div className="Dashboard">
      <div className="Dashboard-left">
        <CheckpointsSection />
      </div>
      <div className="Dashboard-right">
        {user && <FriendsSection />}
        {user && <Events />}
        {user && <Flights />}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.users.me
  };
};

export const DashboardContainer = connect(mapStateToProps)(Dashboard);
export default DashboardContainer;

