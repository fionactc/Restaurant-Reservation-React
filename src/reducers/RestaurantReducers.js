// import _ from 'lodash';
import { FETCH_RESTAURANTS,
  CREATE_RESTAURANT,
  FETCH_RESTAURANT,
  FETCH_OWNER_RESTAURANTS,
  DELETE_RESTAURANT 
} from '../actions/RestaurantActions';

export default function(state={}, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      let restaurants = action.payload.data;
      restaurants.forEach((restaurant)=>{
        restaurant['avgRating'] = calculateAvgRating(restaurant);
      })

      return Object.assign({}, {
        restaurants,
      })
    case FETCH_RESTAURANT:
      let restaurant = action.payload.data;
      console.log(restaurant);
      restaurant['avgRating'] = calculateAvgRating(restaurant);
      return Object.assign({}, state, { restaurant })
    case FETCH_OWNER_RESTAURANTS:
      let ownerRestaurants = action.payload.data;
      ownerRestaurants.forEach((restaurant)=>{
        restaurant['avgRating'] = calculateAvgRating(restaurant);
      })
      return Object.assign({}, {
        ownerRestaurants 
      })
    case DELETE_RESTAURANT:
      let lists = state.ownerRestaurants;
      console.log(lists);
      console.log(state);
      lists.splice(lists.findIndex((item)=> item.id === action.id), 1)
      console.log('this is updated list', lists);
      return Object.assign({}, state, {
        ownerRestaurants: JSON.parse(JSON.stringify(lists))
      })
    case CREATE_RESTAURANT:
      let newRestaurant = action.payload;
      return Object.assign({}, state, {
        isFormSubmitted: true
      })
    default:
      return state
  }
}

function calculateAvgRating(restaurant) {
  let avgRating = 0;
  if (restaurant.reviews.length) {
    restaurant.reviews.forEach((review)=>{
      avgRating += review.rating; 
    })
    avgRating = avgRating/restaurant.reviews.length
  }
  return avgRating;
}
