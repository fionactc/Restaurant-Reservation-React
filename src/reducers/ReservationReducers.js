import { POST_RESERVATION, GET_RESERVATIONS, FETCH_OWNER_RESERVATIONS } from '../actions/ReservationActions';

export default function(state={}, action) {
  switch(action.type) {
    case POST_RESERVATION:
      return Object.assign({}, {
        reservation: action.payload.data,
        isSubmitted: true
      })
    case FETCH_OWNER_RESERVATIONS:
      return Object.assign({}, {
        ownerReservations: action.payload.data
      })
    case GET_RESERVATIONS:
      return Object.assign({}, {
        reservations: action.payload.data
      })
    default:
      return state;
  }
}
