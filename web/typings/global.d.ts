declare module "fb" {
  var FB: any;
  export = FB;
}

type HttpResponse = Response;

declare namespace Checkpoints {
  interface State {
    checkpoints?: Checkpoint[];
    user?: User;
  }

  interface User {
    id?: string;
    name?: string;
    picture?: Picture;
  }

  interface FacebookPicture {
    width: number;
    height: number;
    url: string;
  }

  interface Checkpoint {
    id: number;
    user_id: number;
    title: string;
    description: string;
    isPrivate: boolean;
    comments: string[];
    pictures: string[];
    isCompleted: boolean;
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
}