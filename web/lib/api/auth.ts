import { get, post } from './fetch';

export function register(data: Checkpoints.Forms.Registration) {
  const body = Object.assign({
    client_id: process.env['CLIENT_ID']
  }, data);
  return post('/api/user/register', body)
    .then(response => {
      const token = response.body['access_token'];
      return token;
    });
}

export function login(data: Checkpoints.Forms.Login) {
  const body = {
    grant_type: 'password',
    client_id: process.env['CLIENT_ID'],
    username: data.email,
    password: data.password
  };
  return post('/api/auth/login', body)
    .then(response => {
      const token = response.body['access_token'];
      return token;
    });
}

export function logout() {
  return get('/api/auth/logout');
}