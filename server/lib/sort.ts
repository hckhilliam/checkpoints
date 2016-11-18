export function userSort(u1: CheckpointsServer.User, u2: CheckpointsServer.User) {
  let cmp1 = u1.name.toUpperCase();
  let cmp2 = u2.name.toUpperCase();
  return Number(cmp1 > cmp2) - Number(cmp1 < cmp2);
}