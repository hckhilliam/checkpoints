import { getAccessToken } from './auth';

/**
 * Static methods for calling api with fetch.
 * Sets access_token for authorization.
 */
export default class Api {
  static fetch(url: string, init?: RequestInit): Promise<Response> {
    let headers = init.headers as Headers || new Headers();
    headers.append('Authorization', `Bearer ${getAccessToken()}`);
    const options = Object.assign({}, init, {
      headers
    });
    return window.fetch(url, options);
  }
}
