import axios from 'axios';
import JwtDecode from 'jwt-decode';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    userName: null,
    role: null
  }
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(result) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    userName: result.user_name,
    role: result.authorities[0]
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('jwtToken');
    dispatch(receiveLogout());
  }
}

export function loginUser(creds) {
  let authHeader = 'Basic ' + btoa('testjwtclientid:MaYzkSjmkzPC57L');
  let params = new URLSearchParams();
  params.append('username', creds.username);
  params.append('password', creds.password);
  params.append('grant_type', 'password');

  return dispatch =>{
    dispatch(requestLogin(creds))

    return axios.post(`http://localhost:8080/oauth/token`, 
      params,
      {
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' ,
          'Authorization': authHeader
        }
      }
    ).then((resp)=>{
      if (resp.status === 200) {
        localStorage.setItem("jwtToken", resp.data.access_token);
        let result = JwtDecode(resp.data.access_token);
        dispatch(receiveLogin(result));
      } else {
        dispatch(loginError(resp))
        return Promise.reject(resp);
      }
    })
      .catch((err)=>{
        console.log(err) 
      })
  }
}
