import * as React from 'react';
import CheckpointsSection from '../components/CheckpointsSection';
import Events from '../components/Events'

const Dashboard = props => {
  return (
    <div>
      <CheckpointsSection />
      <Events />
    </div>
  );
}
export default Dashboard;
