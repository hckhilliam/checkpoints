import { getAccessToken, isLoggedIn } from '../auth';

/**
 * Methods for calling api with fetch.
 * Sets access_token for authorization.
 */
export function fetch(url: string, init?: RequestInit): Promise<Checkpoints.Response> {
  let headers = init.headers as Headers || new Headers();
  if (isLoggedIn())
    headers.append('Authorization', `Bearer ${getAccessToken()}`);
  const options = Object.assign({}, init, {
    headers
  });
  return window.fetch(url, options).then(res => {
    if (res.status == 200)
      return res.json().then(body => {
        return {
          response: res,
          status: res.status,
          body
        } as Checkpoints.Response;
      });
    else
      return res.json().then(error => {
        return {
          response: res,
          status: res.status,
          error
        } as Checkpoints.Response;
      });
  });
}

export function post(url: string, body?: any, init?: RequestInit): Promise<Checkpoints.Response> {
  init = Object.assign({}, init, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  });
  return fetch(url, init);
}

