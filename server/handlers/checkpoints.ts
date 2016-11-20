const debug = require('debug')('checkpoints:checkpointsHandler');

import { Request, Response } from 'express';

import * as checkpoint from '../modules/checkpoint';
import { getUserId } from '../lib/request';
import { checkIsSelf } from './authenticator';

export function getCheckpoints(req: Request, res: Response, next: any) {
  const userId = getUserId(req);
  checkpoint.getCheckpoints(userId, checkIsSelf(req))
    .then(checkpoints => res.json(checkpoints))
    .catch(next);
}

export function getCheckpoint(req: Request, res: Response, next: any, checkpointId: number) {
  checkpoint.getCheckpointById(checkpointId, checkIsSelf(req))
    .then(checkpoint => res.json(checkpoint))
    .catch(next);
}

export function createCheckpoint(req: CheckpointsServer.Request, res: Response, next: any) {
  const userId = getUserId(req);
  const { title, description, isPrivate } = req.body as CheckpointsServer.Checkpoint;
  checkpoint.createCheckpoint(userId, title, description, !!isPrivate)
    .then(checkpoint => res.json(checkpoint))
    .catch(next);
}

export function updateCheckpoint(req: CheckpointsServer.Request, res: Response, next: any, checkpointId: number) {
  const body = req.body as CheckpointsServer.Checkpoint;
  checkpoint.updateCheckpoint(checkpointId, body)
    .then(c => res.json(c))
    .catch(next);
}

export function deleteCheckpoint(req: Request, res: Response, next: any, checkpointId: number) {
  checkpoint.deleteCheckpoint(checkpointId)
    .then(() => res.end())
    .catch(next);
}

// todo separate image module?
// const multer = require('multer');
// const UUID = require('uuid-1345');
// export function uploadCheckpointImages(req: Request, res: Response, next: any, checkpointId: number) {
//   const userId = getUserId(req);
//   multer({
//     storage: multer.diskStorage({
//       destination: `./public/uploads/${userId}/${checkpointId}`,
//       filename: function(req: Request, file, callback) {
//         debug(`filename is ${file.originalname}`);
//         callback(null, `${UUID.v1()}-${file.originalname}`);
//       }
//     })
//   }).array('image')(req, res, function (err) {
//     if (err)
//       return next('There was an error uploading the image(s)');
//     res.end();
//   });
// }