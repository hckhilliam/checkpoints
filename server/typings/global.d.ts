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
    picture?: Picture;
    settings?: {
      isSubscribed?: boolean;
    };
  }

  interface Picture {
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
    pictures: Picture[];
    isCompleted: boolean;
    createdOn: Date;
    completedOn: Date;
  }

  interface Token {
    token: string;
    user_id: number;
    client_id: string;
    expires: Date;
  }

  interface SearchResult {
    type: string;
    _id: number;
    name: string;
    picture?: Picture;
  }

  interface Location {
    lng: Number;
    lat: Number;
    country: String;
  }

  interface Flight {
    Price: number;
    url: string;
    originCode: string;
    destinationCode: string;
    departureDate: Date;
  }

  interface FlightQuery {
    originName?: string;
    destinationName?: string;
    originCode: string;
    destinationCode: string;
    departureDate?: Date;
  }

  export interface Event {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    distance?: number;
    eventSource: string;
    pictureURL: string;
  }
}
