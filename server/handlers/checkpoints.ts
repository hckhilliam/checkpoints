const debug = require('debug')('checkpoints:checkpointsHandler');
const multer = require('multer');
const UUID = require('uuid-1345');

import { Request, Response } from 'express';

import * as checkpoint from '../modules/checkpoint';

export function getCheckpoints(req: Request, res: Response, next: any, userId: number) {
  checkpoint.getCheckpointById(userId)
    .then(checkpoints => res.json(checkpoints))
    .catch(next);
}

export function getCheckpoint(req: Request, res: Response, next: any, checkpointId: number) {
  checkpoint.getCheckpointById(checkpointId)
    .then(checkpoint => res.json(checkpoint))
    .catch(next);
}

export function createCheckpoint(req: Request, res: Response, next: any, userId: number) {
  const { title, description, isPrivate } = req['body'];
  checkpoint.createCheckpoint(userId, title, description, !!isPrivate)
    .then(checkpoint => res.json(checkpoint))
    .catch(next);
}

export function updateCheckpoint(req: Request, res: Response, next: any, checkpointId: number) {
  const checkpoint = req['body'];
  checkpoint.updateCheckpoint(checkpointId, checkpoint)
    .then(c => res.json(c))
    .catch(next);
}

export function deleteCheckpoint(req: Request, res: Response, next: any, checkpointId: number) {
  checkpoint.deleteCheckpoint(checkpointId)
    .then(() => res.sendStatus(200))
    .catch(next);
}

export function uploadCheckpointImages(req: Request, res: Response, next: any, userId: number, checkpointId: number) {
  multer({
    storage: multer.diskStorage({
      destination: `./public/uploads/${userId}/${checkpointId}`,
      filename: function(req: Request, file, callback) {
        debug(`filename is ${file.originalname}`);
        callback(null, `${UUID.v1()}-${file.originalname}`);
      }
    })
  }).array('image')(req, res, function (err) {
    if (err)
      return next('There was an error uploading the image(s)');
    res.status(200).end('Image(s) uploaded successfully');
  });
}