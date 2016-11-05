export function getUser(req: CheckpointsServer.Request) {
  return req.customParams.user;
}

export function getUserId(req: CheckpointsServer.Request) {
  return getUser(req)._id;
}