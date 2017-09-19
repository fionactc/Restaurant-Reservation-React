import axios from 'axios';

export const POST_RESERVATION = 'POST_RESERVATION';
export const GET_RESERVATIONS = 'GET_RESERVATIONS';
export const FETCH_OWNER_RESERVATIONS = 'FETCH_OWNER_RESERVATIONS';

const ROOT_URL = 'http://localhost:8080/api-docs'
const headers = { 'Authorization': 'bearer ' + localStorage.getItem('jwtToken') };

export function getReservations(userName) {
  const request = axios.get(`${ROOT_URL}/reservations?username=${userName}`, { headers })
  return {
    type: GET_RESERVATIONS,
    payload: request
  }
  
}

export function postReservation(data) {
  console.log('inside actions');
  const request = axios.post(`${ROOT_URL}/reservation`, data, { headers })
  return {
    type: POST_RESERVATION,
    payload: request
  }
}

export function getOwnerReservations(ownerName) {
  const request = axios.get(`${ROOT_URL}/owner-reservations?username=${ownerName}`, { headers})
  return {
    type: FETCH_OWNER_RESERVATIONS,
    payload: request
  }
}
