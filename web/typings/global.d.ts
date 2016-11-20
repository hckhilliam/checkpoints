declare module "fb" {
  var FB: any;
  export = FB;
}

type HttpResponse = Response;

declare namespace Checkpoints {
  interface Event {
    id: number;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    distance?: number;
    eventSource: string;
    pictureURL: string;
  }

  interface Flight {
    price: number;
    url: string;
    origin: string;
    destintaion: string;
    departureDate: Date;
  }

  interface eventSearch {
    lng: number;
    lat: number;
    distance: number;
    filter: string;
  }

  interface State {
    checkpoints?: CheckpointsState;
    users?: UsersState;
    user?: User;
  }

  interface User {
    id?: number;
    name?: string;
    picture?: Picture;
    settings?: {
      isSubscribed?: boolean;
    };
  }

  interface Friend {
    id: number;
    name: string;
    picture: Picture;
  }

  interface FacebookPicture {
    width: number;
    height: number;
    url: string;
  }

  interface Checkpoint {
    id?: number;
    title?: string;
    description?: string;
    isPrivate?: boolean;
    comments?: string[];
    pictures?: Picture[];
    isCompleted?: boolean;
    notes?: string;
    loaded?: boolean;
    completedOn?: Date;
  }

  interface Response {
    response: HttpResponse;
    status: number;
    body?: any;
    error?: any;
  }

  interface Picture {
    width: number;
    height: number;
    url: string;
  }

  namespace Forms {
    interface Registration {
      name: string;
      email: string;
      password: string;
    }

    interface Login {
      email: string;
      password: string;
    }

    interface Checkpoint {
      id?: number;
      title: string;
      description?: string;
      notes?: string;
      private: boolean;
    }
  }

  interface SearchResult {
    type: string;
    id: number;
    name: string;
    picture?: Picture;
    show: boolean;
  }

  interface SharedState<T> {
    me: T;
    users: {
      [userId: number]: T;
    };
  }

  type CheckpointsState = SharedState<Checkpoint[]>;
  type UsersState = SharedState<User[]>;
}

