declare module "fb" {
  var FB: any;
  export = FB;
}

type HttpResponse = Response;

declare namespace Checkpoints {
  interface Event {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    distance?: number;
    eventSource: string;
    pictureURL: string;
  }

  interface eventSearch {
    lng: number;
    lat: number;
    distance: number;
    filter: string;
  }

  interface State {
    checkpoints?: Checkpoint[];
    user?: User;
  }

  interface User {
    id?: string;
    name?: string;
    picture?: Picture;
  }

  interface Friend {
    id: number;
    name: string;
  }

  interface FacebookPicture {
    width: number;
    height: number;
    url: string;
  }

  interface Checkpoint {
    id: number;
    title: string;
    description: string;
    isPrivate: boolean;
    comments: string[];
    pictures: string[];
    isCompleted: boolean;
    loaded: boolean;
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
      title: string;
      description: string;
    }
  }

  interface SearchResults {
    type: string;
    name: string;
  }
}

