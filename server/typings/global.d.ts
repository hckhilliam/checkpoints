declare namespace CheckpointsServer {
  interface Request {
    body?: any;
    user?: User;
    customParams?: {
      user?: User
    };
  }

  interface User {
    _id: number;
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
}
