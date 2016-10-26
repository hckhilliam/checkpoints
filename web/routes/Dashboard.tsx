import * as React from 'react';

import CheckpointsSection from '../components/CheckpointsSection';
import Event from '../components/Event'

const Dashboard = props => {
  return (
    <div>
      <CheckpointsSection />
      <Event />
    </div>
  );
}
export default Dashboard;
