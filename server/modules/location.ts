const debug = require('debug')('checkpoints:locationModule');
import { Request } from 'express';
var geoip = require('node-freegeoip');

interface Location {
  lng: Number;
  lat: Number;
}

export function getLocation(req: Request): Promise<Location> {
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
        lat: location.latitude,
        lng: location.longitude
      });
    });
  });
}