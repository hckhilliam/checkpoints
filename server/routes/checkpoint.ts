import {Router, Request, Response} from 'express';
import * as checkpoint from '../modules/checkpoint';

const api = Router();

api.post('/', (req: Request, res: Response, next) => {
  const {title, description, isPrivate} = req['body'];
  checkpoint.createCheckpoint(7, title, description, !!isPrivate).then(checkpoint => {
    res.json(checkpoint);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  })
});

api.get('/user/:user_id/checkpoints', (req: Request, res: Response, next) => {
  getCheckpoints(res, Number(req.params['user_id']));
});

api.get('/user/:user_id/checkpoints/:_id', (req: Request, res: Response, next) => {
  getCheckpointById(res, Number(req.params['_id']));
});

api.get('/me/checkpoints', (req: Request, res: Response, next) => {

});

api.get('/me/checkpoints/:_id', (req: Request, res: Response, next) => {

});

function getCheckpoints(res: Response, user_id: number) {
  checkpoint.getCheckpoints(user_id).then(checkpoints => {
    res.json(checkpoints);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  });
}

function getCheckpointById(res: Response, _id: number) {
  checkpoint.getCheckpointById(_id).then(checkpoint => {
    res.json(checkpoint);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  });
}

api.put('/:_id', (req: Request, res: Response, next) => {
  checkpoint.updateCheckpoint(Number(req.params['_id']), req['body']).then(checkpoint => {
    res.json(checkpoint);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  });
});

api.delete('/:_id', (req: Request, res: Response, next) => {
  checkpoint.deleteCheckpoint(Number(req.params['_id'])).then(checkpoint => {
    res.json(checkpoint);
  }).catch(error => {
    res.status(500);
    res.json({
      error
    });
  });
});

export default api;