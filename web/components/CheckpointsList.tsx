import * as React from 'react'

import {CheckpointItem, CheckpointItemContainer} from './CheckpointItem';

interface Props {
  list: Checkpoints.Checkpoint[];
  title: string;
}

export const CheckpointsList = (props: Props) => {
  return (
    <div className="CheckpointsList ">
      <h3>{props.title}</h3>
      {
        props.list.map(item => {
          return <CheckpointItemContainer item={item} key={item.id} />
        })
      }
    </div>
  );
}

export default CheckpointsList;