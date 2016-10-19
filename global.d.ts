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
    id: Number;
    user_id: Number;
    title: string;
    description: string;
    isPrivate: boolean;
    comments: string[];
    pictures: string[];
    isCompleted: boolean;
  }
}