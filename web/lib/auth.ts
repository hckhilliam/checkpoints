export function checkLogin() {
  FB.getLoginStatus(response => {
    console.log(response);
    if (response.status == 'connected')
      login();
  });
}

export function login() {
  fetch('/api/auth/facebook');
}

export function loginDialog() {
  FB.login(response => {
    console.log(response);
    if (response.status == 'connected')
      login();
  }, true);
}

export function logout() {
  FB.logout(response => {
    window.location.href = '/api/auth/logout';
  });
}