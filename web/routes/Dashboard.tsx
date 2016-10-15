import * as React from 'react';
import { render } from 'react-dom';


export default class  Dashboard extends React.Component<{}, {}>{
  render() {

    //  var name = "";
    // FB.api('/me', {fields: 'last_name,first_name'},response => {
    //   name = response.first_name + " " + response.last_name;
    //   console.log(response);
    // }); dont know what im doing????
    return (
      <div>
        {name}'s dashboard
      </div>
    );
  }
}
