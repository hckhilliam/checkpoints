import { getAccessToken, isLoggedIn } from '../auth';

/**
 * Methods for calling api with fetch.
 * Sets access_token for authorization.
 */
function parseResponse(response) {
  return new Promise((resolve, reject) => {
    response.text()
      .then(text => {
        try {
          resolve(JSON.parse(text));
        } catch (e) {
          resolve(text);
        }
      })
      .catch(err => reject);
  });
}

function fetch(url: string, init: RequestInit = {}): Promise<Checkpoints.Response> {
  let headers = init.headers as Headers || new Headers();
  if (isLoggedIn())
    headers.append('Authorization', `Bearer ${getAccessToken()}`);
  const options = Object.assign({}, init, {
    headers
  });
  return new Promise<Checkpoints.Response>((resolve, reject) => {
    window.fetch(url, options).then(res => {
      if (res.status == 200)
        return parseResponse(res).then(body => {
          resolve({
            response: res,
            status: res.status,
            body
          });
        });
      else
        return parseResponse(res).then(error => {
          reject({
            response: res,
            status: res.status,
            error
          });
        });
      });
  });
}

export function get(url: string, params?: { [key: string]: string }, init?: RequestInit): Promise<Checkpoints.Response> {
  init = Object.assign({}, init, {
    method: 'GET'
  });

  if (params) {
    const querystring = _.map(params, (v, k) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    url += `?${querystring}`;
  }

  return fetch(url, init);
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

export function put(url: string, body?: any, init?: RequestInit): Promise<Checkpoints.Response> {
  init = Object.assign({}, init, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  });
  return fetch(url, init);
}

export function del(url: string, init?: RequestInit): Promise<Checkpoints.Response> {
  init = Object.assign({}, init, {
    method: 'DELETE'
  });
  return fetch(url, init);
}
