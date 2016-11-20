import './Dashboard.scss'; 

import * as React from 'react';
import CheckpointsSection from '../components/CheckpointsSection';
import Events from '../components/Events'
import Flights from '../components/Flights'
import FriendsSection from '../components/FriendsSection';


const Dashboard = props => {
  return ( 
    <div className="Dashboard">
      <CheckpointsSection />
      <div className="DashboardRight">
        <FriendsSection />
          <div className="EventsWarpper"><Events /></div>
          <div className="FlightsWarpper"><Flights /></div>
      </div>
    </div>
  );
};
export default Dashboard;
