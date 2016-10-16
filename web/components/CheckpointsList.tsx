import * as React from 'react'

import CheckpointItem from './CheckpointItem';

interface Props {
  list: Checkpoints.Checkpoint[]
}

export const CheckpointsList = (props: Props) => {
  return (
    <div>
      {
        props.list.map(item => {
          return <CheckpointItem item={item} key={item.id} />
        })
      }
    </div>
  );
}

export default CheckpointsList;