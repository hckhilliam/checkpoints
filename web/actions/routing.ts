import { Action } from 'redux';
import { push } from 'react-router-redux';

export function home(): Action {
  return push('/');
}

export function dashboard(): Action {
  return push('/dashboard');
}