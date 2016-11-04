/// <reference path="../../typings/index.d.ts" />

declare namespace Checkpoints {
  interface Request {
    user?: User;
    customParams?: {
      user?: User
    };
  }

  interface User {
    _id: number;
    name: string;
  }
}
