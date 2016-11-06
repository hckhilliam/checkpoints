export function getUrl(url: string, userId?: number) {
  return userId
    ? `/api/users/${userId}/${url}`
    : `/api/me/${url}`;
}