declare namespace CheckpointsServer {
  interface Request {
    body?: any;
    user?: User;
    customParams?: {
      user?: User
    };
  }

  interface User {
    _id?: number;
    name?: string;
    email?: string;
    password?: string;
    friends?: number[];
    friendRequests?: number[];
    accounts?: {
      facebook?: FacebookUser;
    };
    picture?: UserPicture;
  }

  interface UserPicture {
    width: number;
    height: number;
    url: string;
  }

  interface FacebookUser {
    id?: string;
    email: string;
    name: string;
  }

  interface Checkpoint {
    _id: number;
    user_id: number;
    title: string;
    description: string;
    isPrivate: boolean;
    comments: string[];
    pictures: string[];
    isCompleted: boolean;
  }

  interface Token {
    token: string;
    user_id: number;
    client_id: string;
    expires: Date;
  }
}