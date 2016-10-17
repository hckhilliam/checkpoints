import * as React from 'react';
import {Profile} from '../components/Profile';
import CheckpointsMain, {CheckpointsMainContainer} from '../components/CheckpointsMain'

interface Props {
  imageUrl: string;
  name: string;
  checkpoints: [Checkpoints.Checkpoint]
}

const Dashboard = props => {
  return (
    <div>
      <Profile imageUrl="put image URL here" name="insert profile name here" />
      <CheckpointsMainContainer />
    </div>
  );
}
export default Dashboard;
