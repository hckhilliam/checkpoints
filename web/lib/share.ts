export function checkpointLink(userId: number, checkpointId: number) {
  return `${window.location.origin}/checkpoint/${userId}/${checkpointId}`;
}