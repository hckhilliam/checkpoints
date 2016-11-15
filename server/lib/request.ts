export function getUser(req: CheckpointsServer.Request) {
  return req.customParams.user;
}

export function getUserId(req: CheckpointsServer.Request) {
  return getUser(req)._id;
}

export function getFacebookId(req: CheckpointsServer.Request) {
  return _.get(getUser(req), 'accounts.facebook.id') as string;
}