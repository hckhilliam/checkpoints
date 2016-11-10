import * as React from 'react';
import CheckpointsMain, { CheckpointsMainContainer } from '../components/CheckpointsMain'
import CheckpointForm from '../components/CheckpointForm';

interface Props {
  imageUrl: string;
  name: string;
  checkpoints: Checkpoints.Checkpoint[]
}

const Dashboard = props => {
  return (
    <div>
      <CheckpointForm />
      <CheckpointsMainContainer />
    </div>
  );
}
export default Dashboard;
