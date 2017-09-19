import { POST_REVIEW, GET_REVIEWS } from '../actions/ReviewActions';

export default function(state={}, action) {
  switch(action.type) {
    case GET_REVIEWS:
      let reviews = action.payload.data;
      let rating = 0;
      if (reviews && reviews.length) {
        reviews.forEach((review)=>{
          rating+=review.rating;
        })
        rating = rating/reviews.length
      }
      return Object.assign({}, {
        reviews,
        reviewRating: rating
      })
    case POST_REVIEW:
      let clone = JSON.parse(JSON.stringify(state.reviews));
      clone.unshift(action.payload.data);

      return Object.assign({}, {
        reviews: clone
      })
    default: 
      return state
  }
}
