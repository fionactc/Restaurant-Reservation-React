import { combineReducers } from 'redux';
import JwtDecode from 'jwt-decode';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions'

import restaurant from './RestaurantReducers';
import review from './ReviewReducers';
import reservation from './ReservationReducers';

let initialState = { isFetching: false, }

let decodedCreds = getDecodedToken();

if (decodedCreds) {
  initialState.userName = decodedCreds.user_name;
  initialState.role = decodedCreds.authorities[0];
  initialState.isAuthenticated = true;
} else {
  initialState.isAuthenticated = false;
}

function getDecodedToken() {
  let token = localStorage.getItem('jwtToken')
  if (token) return JwtDecode(token);
}

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      let decodedCreds = getDecodedToken();
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        userName: decodedCreds.user_name,
        role: decodedCreds.authorities[0]
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        userName: null,
        role: null
      })
    default:
      return state
  }
}

const app = combineReducers({
  auth,
  restaurant,
  review,
  reservation
})

export default app;
