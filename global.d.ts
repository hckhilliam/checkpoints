declare module "fb" {
  var FB: any;
  export = FB;
}

declare namespace Checkpoints {
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