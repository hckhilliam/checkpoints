import * as React from 'react';
import CheckpointsMain, { CheckpointsMainContainer } from '../components/CheckpointsMain'
import CheckpointsForm from '../components/CheckpointsForm';

interface Props {
  imageUrl: string;
  name: string;
  checkpoints: Checkpoints.Checkpoint[]
}

const Dashboard = props => {
  return (
    <div>
      <CheckpointsForm />
      <CheckpointsMainContainer />
    </div>
  );
}
export default Dashboard;
