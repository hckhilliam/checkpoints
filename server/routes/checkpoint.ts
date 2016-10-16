import { Router, Request, Response } from 'express';
import { createCheckpoint } from '../modules/checkpoint';

const api = Router();

api.get('/create', (req: Request, res: Response, next) => {
    const { title, description, isPrivate } = req.query;
    createCheckpoint(title, description, !!isPrivate).then(checkpoint => {
        res.json(checkpoint);
    }).catch(error => {
        res.status(500);
        res.json({
            error
        });
    })
});

export default api;