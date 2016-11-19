const debug = require('debug')('checkpoints:locationModule');
import { Request } from 'express';
var geoip = require('node-freegeoip');

export function getLocation(req: Request): Promise<CheckpointsServer.Location> {
  let ip = req.headers['X-Forwarded-For'] ||
    req['connection'].remoteAddress ||
    req.socket.remoteAddress ||
    req['connection'].socket.remoteAddress;
  debug('ip:', ip);
  return new Promise((resolve, reject) => {
    geoip.getLocation(ip, function(err, location) {
      if (err)
        return reject(err);
      resolve({
        country: location.country_name, 
        lat: location.latitude,
        lng: location.longitude
      });
    });
  });
}