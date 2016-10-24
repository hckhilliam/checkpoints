import * as Cookie from 'js-cookie';

const ACCESS_TOKEN = 'access_token';
const FACEBOOK_TOKEN = 'facebook_token';

export function initializeAuth() {
  let accessToken = Cookie.get(ACCESS_TOKEN);
  let facebookToken = Cookie.get(FACEBOOK_TOKEN);
  Cookie.remove(ACCESS_TOKEN);
  Cookie.remove(FACEBOOK_TOKEN);

  if (accessToken)
    localStorage.setItem(ACCESS_TOKEN, accessToken);

  if (facebookToken)
    localStorage.setItem(FACEBOOK_TOKEN, facebookToken);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getFacebookToken() {
  return localStorage.getItem(FACEBOOK_TOKEN);
}

export function isLoggedIn() {
  return !!getAccessToken();
}

export function isFacebookLoggedIn() {
  return !!getFacebookToken();
}

export function clear() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(FACEBOOK_TOKEN);
}