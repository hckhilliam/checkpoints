import * as React from 'react';
import CheckpointsSection from '../components/CheckpointsSection';
import Events from '../components/Events'
import FriendsSection from '../components/FriendsSection';

const Dashboard = props => {
  return (
    <div>
      <CheckpointsSection />
      <Events />
      <FriendsSection />
    </div>
  );
}
export default Dashboard;
