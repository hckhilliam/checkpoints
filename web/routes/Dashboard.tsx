import './Dashboard.scss'; 

import * as React from 'react';
import CheckpointsSection from '../components/CheckpointsSection';
import Events from '../components/Events'
import FriendsSection from '../components/FriendsSection';


const Dashboard = props => {
  return ( 
    <div className="Dashboard">
      <CheckpointsSection />
      <div className="DashboardRight">
        <FriendsSection />
        
        {/* <div className="Events" /> */}
        <Events />
      </div>
    </div>
  );
};
export default Dashboard;
