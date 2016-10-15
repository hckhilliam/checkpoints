// import * as Redux from 'redux';

export function checkLogin() {
  return dispatch => {
    FB.getLoginStatus(response => {
      const { status } = response;
      if (status == 'connected') {
        // todo
        console.log(response);
      } else {
        dispatch(login());
      }
    });
  };
}

export function login() {
  return dispatch => {
    FB.login(response => {
      console.log(response);
    });
  };
}
