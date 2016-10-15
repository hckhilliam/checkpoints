export function checkLogin() {
  FB.getLoginStatus(response => {
    const { status } = response;
    if (status == 'connected') {
      console.log(1);
    } else {
      login();
    }
  });
}

export function login() {
  window.location.href = '/api/auth/facebook';
}