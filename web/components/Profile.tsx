import * as React from 'react';

interface Props {
  imageUrl: string;
  name: string;
}

export const Profile = (props: Props) => {
  return (
    <div>
      <img src={props.imageUrl} />
      {props.name}
    </div>
  );
}

export default Profile;