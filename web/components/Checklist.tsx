import * as React from 'react';
// import { connect } from 'react-redux';
// import * as lodash from 'lodash';

//  errors lodash is undefined module (mmaybe fixed by adding it to typings)
// _ is undefined


import ChecklistItem from './ChecklistItem';

interface Props {
}

export class Checklist extends React.Component<Props, {}>{
  render() {
    let items = [
      {
        "id": 1,
        "completed": false,
        "description": "sleep early"
      },
      {
        "id": 1,
        "completed": false,
        "description": "sleep early"
      },
      {
        "id": 2,
        "completed": false,
        "description": "item 2"
      },
      {
        "id": 3,
        "completed": false,
        "description": "something something"
      },
      {
        "id": 5,
        "completed": true,
        "description": "so ball?"
      }
    ];
    return (
      <div>
        Incomplete Item
        {
          // _.find(items, {completed: true}).map(item => (
            <ChecklistItem item={items[0]}/>
          // ))
        }

        Complete
      </div>
    );
  }
}

export default Checklist;
