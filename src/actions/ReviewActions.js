import axios from 'axios';
import { fetchRestaurant } from './RestaurantActions';

export const POST_REVIEW = 'POST_REVIEW';
export const GET_REVIEWS = 'GET_REVIEWS';

const ROOT_URL = 'http://localhost:8080/api-docs'
const headers = { 'Authorization': 'bearer ' + localStorage.getItem('jwtToken') };

export function postReview(data) {
  const request = axios.post(`${ROOT_URL}/review`, data, { headers })
  // return dispatch=>{
  //   axios.post(`${ROOT_URL}/review`, data, { headers })
  //     .then((resp)=>{
  //       dispatch(fetchRestaurant(resp.data.restaurantId))
  //     })
  // }
  return {
    type: POST_REVIEW,
    payload: request
  }
}

export function fetchReviews(restaurantId) {
  const request = axios.get(`${ROOT_URL}/reviews?id=${restaurantId}`, { headers })
  return {
    type: GET_REVIEWS,
    payload: request
  }
}
