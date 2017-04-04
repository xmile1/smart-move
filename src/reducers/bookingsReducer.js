import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bookingReducer(state = initialState.bookings, action) {
  switch (action.type) {
    case types.BOOKINGS_RETRIEVED_SUCCESS:
        return Object.assign({}, state, action.bookings);
    case types.BOOKING_RETRIEVED_SUCCESS:
        return Object.assign({}, initialState.booking, action.booking);
    default:
      return state;
  }
}
