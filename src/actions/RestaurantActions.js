import axios from 'axios';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_OWNER_RESTAURANTS = 'FETCH_OWNER_RESTAURANTS';
export const CREATE_RESTAURANT = 'CREATE_RESTAURANT';
export const FETCH_RESTAURANT = 'FETCH_RESTAURANT';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
const ROOT_URL = 'http://localhost:8080/api-docs'
const headers = { 'Authorization': 'bearer ' + localStorage.getItem('jwtToken') };

export function fetchRestaurants() {
  const request = axios.get(`${ROOT_URL}/restaurants` , { headers })
  return {
    type: FETCH_RESTAURANTS,
    payload: request
  }
}

export function fetchOwnerRestaurants(ownerName) {
  const request = axios.get(`${ROOT_URL}/owner-restaurants?ownerName=${ownerName}`, { headers})
  return {
    type: FETCH_OWNER_RESTAURANTS,
    payload: request
  }
}

export function postRestaurant(data) {
  let request;
  if (data.id) {
    request = axios.patch(`${ROOT_URL}/update-restaurant`, 
      data,
      { headers: { 'Authorization': 'bearer ' + localStorage.getItem('jwtToken') }}
    )
  }
  else {
    request = axios.post(`${ROOT_URL}/restaurant`, 
      data,
      { headers: { 'Authorization': 'bearer ' + localStorage.getItem('jwtToken') }}
    )
  }
  return {
    type: CREATE_RESTAURANT,
    payload: request
  }
}

export function deleteRestaurant(id) {
  const request = axios.delete(`${ROOT_URL}/restaurant?id=${id}`, { headers })
  return {
    type: DELETE_RESTAURANT,
    id,
    payload: request
  }
}

export function fetchRestaurant(id) {
  const request = axios.get(`${ROOT_URL}/restaurant?id=${id}`, { headers })
  return {
    type: FETCH_RESTAURANT,
    payload: request
  }
}
