declare module "fb" {
  var FB: any;
  export = FB;
}

declare namespace Checkpoints {
  interface State {
    checkpoints?: Checkpoint[];
    user?: User;
  }

  interface User {
    name?: string;
    email?: string;
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
}