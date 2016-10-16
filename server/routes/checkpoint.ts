import {Router, Request, Response} from 'express';
import * as checkpoint from '../modules/checkpoint';

const api = Router();

api.get('/create', (req: Request, res: Response, next) => {
  const {title, description, isPrivate} = req.query;
  checkpoint.createCheckpoint(title, description, !!isPrivate).then(checkpoint => {
    res.json(checkpoint);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  })
});

api.get('/getCheckpoints', (req: Request, res: Response, next) => {
  checkpoint.getUserCheckpoints().then(checkpoints => {
    res.json(checkpoints);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  });
});

export default api;