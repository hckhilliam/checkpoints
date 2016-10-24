import { post } from './fetch';

export function register(data: Checkpoints.Registration) {
  return post('/api/user/register', data);
}

export function login(data: Checkpoints.Login) {
  const body = {
    grant_type: 'password',
    client_id: process.env['CLIENT_ID'],
    username: data.email,
    password: data.password
  };
  return post('/api/auth/login', body)
    .then(token => {
      console.log(token);
    })
    .catch(err => {
      console.log(err)
    });
}

export function logout() {
  return post('/api/auth/logout');
}