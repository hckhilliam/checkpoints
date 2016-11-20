import { Request, Response } from 'express';

import * as user from '../modules/user';
import { getUserId } from '../lib/request';

export function updateUser(req: CheckpointsServer.Request, res: Response, next: any, targetUser?: CheckpointsServer.User) {
    const { name, settings } = req.body as CheckpointsServer.User;
    if (settings) targetUser.settings = settings;
    if (name) targetUser.name = name;
    
    user.updateUser(targetUser)
      .then(() => res.end())
      .catch(next);
}

