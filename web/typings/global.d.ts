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

  interface Registration {
    name: string;
    email: string;
    password: string;
  }

  interface Login {
    email: string;
    password: string;
  }

  interface Response {
    response: HttpResponse;
    status: number;
    body?: any;
    error?: any;
  }
}