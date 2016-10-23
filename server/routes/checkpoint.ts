const debug = require('debug')('checkpoints:checkpoint');
import {Router, Request, Response} from 'express';
import * as checkpoint from '../modules/checkpoint';

const api = Router();

const multer = require('multer');
const UUID = require('uuid-1345');

/* HOW TO USE
 <form id        =  "uploadForm"
 enctype   =  "multipart/form-data"
 action    =  "/api/checkpoint/me/checkpoints/2/upload"
 method    =  "post"
 >
 <input type="file" name="image" multiple/>
 <input type="submit" value="Upload Image" name="submit">
 </form>
 */
api.post('/me/checkpoints/:_id/upload', (req: Request, res: Response, next) => {
  multer({
    storage: multer.diskStorage({
      destination: `./public/uploads/7/${req.params['_id']}`,
      filename: function(req: Request, file, callback) {
        debug(`filename is ${file.originalname}`);
        callback(null, `${UUID.v1()}-${file.originalname}`);
      }
    })
  }).array('image')(req, res, function (err) {
    if (err) {
      res.end('There was an error uploading the image(s)');
      throw err;
    }
    res.end('Image(s) uploaded successfully');
  });
});

api.post('/', (req: Request, res: Response, next) => {
  const {title, description, isPrivate} = req['body'];
  console.log(req);
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
